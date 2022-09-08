const DatabaseClientPoolService = require('../services/PostgreReposirotyClientPool')
const { executeQuery } = require('../helper/sql')


const databaseClientService = new DatabaseClientPoolService()
let pool;

module.exports.handler = async (req, res) => {
    try {
        console.log(pool);
        if (!pool) {
            pool = await databaseClientService.buildPool()
        }

        const query = await executeQuery(pool, `SELECT t1.transactionid as transaction_id, u1.username as recipient, u2.username as giver
        FROM transactions as t1
        INNER JOIN users as u1 
            ON t1.recipientfk=u1.userid
        INNER JOIN users as u2
            ON t1.giverfk=u2.userid;
        `)

        console.log(query);

        res.status(200).send(query);
    } catch (error) {
        console.log(error);
        res.end(500)
    }
}