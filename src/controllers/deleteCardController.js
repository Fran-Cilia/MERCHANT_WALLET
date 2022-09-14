const DatabaseClientPoolService = require('../services/PostgreReposirotyClientPool')
const { executeQuery } = require('../helper/sql')


const databaseClientService = new DatabaseClientPoolService()
let pool;

module.exports.handler = async (req, res) => {
    try {
        if (!pool) {
            pool = await databaseClientService.buildPool()
        }

        const { card_number } = req.body;

        if (!card_number || Object.keys(req.body).length !== 1 ) {
            res.status(400).send('Fail')
        }
        else {

            console.log(card_number);
            const query = await executeQuery(pool, `DELETE FROM cards 
            WHERE card_number = '${card_number}';`)

            res.status(200).send('Ok');
        }
    } catch (error) {
        console.log(error);
        res.end(500)
    }
}