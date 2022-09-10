const DatabaseClientPoolService = require('../services/PostgreReposirotyClientPool')
const { executeQuery } = require('../helper/sql')


const databaseClientService = new DatabaseClientPoolService()
let pool;

module.exports.handler = async (req, res) => {
    try {
        if (!pool) {
            pool = await databaseClientService.buildPool()
        }

        const query = await executeQuery(pool, `SELECT t1.transaction_id as transaction_id, u1.user_name as recipient, u2.user_name as giver
        FROM transactions as t1
        INNER JOIN users as u1 
            ON t1.recipient_fk=u1.user_id
        INNER JOIN users as u2
            ON t1.giver_fk=u2.user_id;`)


        res.status(200).send(query);
    } catch (error) {
        console.log(error);
        res.end(500)
    }
}