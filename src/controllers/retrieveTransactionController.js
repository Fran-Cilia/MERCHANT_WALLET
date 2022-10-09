const DatabaseClientPoolService = require('../services/PostgreReposirotyClientPool')
const { executeQuery } = require('../helper/sql');
const { all } = require('../routes/routes');


const databaseClientService = new DatabaseClientPoolService()
let pool;

module.exports.handler = async (req, res) => {
    try {
        if (!pool) {
            pool = await databaseClientService.buildPool()
        }
        
        const {params:{user_id} } = req;

        const publicTransactions = await executeQuery(pool, `SELECT t1.transaction_id as transaction_id, u1.user_name as recipient, u2.user_name as giver, t1.message
        FROM transactions as t1
        INNER JOIN users as u1 
            ON t1.recipient_fk=u1.user_id
        INNER JOIN users as u2
            ON t1.giver_fk=u2.user_id
        WHERE u1.user_id!=${user_id} and u2.user_id!=${user_id};`)

        const privateTransactions = await executeQuery(pool, `SELECT t1.transaction_id as transaction_id, u1.user_name as recipient, u2.user_name as giver, t1.message, t1.amount
        FROM transactions as t1
        INNER JOIN users as u1 
            ON t1.recipient_fk=u1.user_id
        INNER JOIN users as u2
            ON t1.giver_fk=u2.user_id
        WHERE u1.user_id=${user_id} or u2.user_id=${user_id};`)

        const allTransactions = {
            public: publicTransactions.rows,
            private: privateTransactions.rows}

        res.status(200).send(allTransactions);
    } catch (error) {
        console.log(error);
        res.end(500)
    }
}