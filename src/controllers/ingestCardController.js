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

        const { body } = req;
        console.log(Object.keys(body).length);

        if (Object.keys(body).length !== 7) {
            res.status(400).send("Fail");
        }
        else {
            const query = await executeQuery(pool, `INSERT INTO cards (user_fk, card_type, card_bank, card_number, expiration_date, cvc, cardholder_name)
            VALUES ('${body.userfk}', '${body.cardType}', '${body.cardBank}', '${body.cardNumber}', '${body.expirationDate}', '${body.cvc}', '${body.cardholderName}')` )


            res.status(200).send(body);
        }
    } catch (error) {
        console.log(error);
        res.end(500)
    }
}