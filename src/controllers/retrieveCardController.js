const { client } = require('./../databasepg')
const DatabaseClientPoolService = require('../services/PostgreReposirotyClientPool');
const { executeQuery } = require('../helper/sql');
const { response } = require('express');


const databaseClientService = new DatabaseClientPoolService();
let pool;

module.exports.handler = async (req, res) => {
    try {
        console.log(pool);
        if (!pool) {
            pool = await databaseClientService.buildPool();
        }
        const { body, params:{user_id} } = req;

        const query = await executeQuery(pool,
            `SELECT * FROM cards
        WHERE user_fk=${user_id};`)
        
        res.status(200).send(query);
    } catch (error) {
        console.log(error);
        res.end(500);
    }
}


