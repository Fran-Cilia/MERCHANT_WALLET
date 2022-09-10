const DatabaseClientPoolService = require('../services/PostgreReposirotyClientPool')
const { executeQuery } = require('../helper/sql')


const databaseClientService = new DatabaseClientPoolService()
let pool;

module.exports.handler = async (req, res) => {
    try {
        if (!pool) {
            pool = await databaseClientService.buildPool()
        }

        const { body, params: { user_id } } = req

        if (Object.keys(body).length !== 3) {
            res.status(400).send("Fail");
        }
        else {

            const query = executeQuery(pool, `INSERT INTO transactions (recipient_fk, giver_fk, transaction_date, amount)
        VALUES (${body.recipient_fk}, ${user_id}, '${body.transaction_date}', ${body.amount});`)

            res.status(200).send('Ok')
        }
    } catch (error) {
        console.log(error);

        res.end(500)
    }
}