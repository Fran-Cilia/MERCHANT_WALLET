const express = require('express');

const router = express.Router();

const { handler: retrieveCardController } = require('../controllers/retrieveCardController')
const { handler: retrieveTransactionController } = require('../controllers/retrieveTransactionController')
const { handler: ingestCardController } = require('../controllers/ingestCardController')
const { handler: ingestTransactionController } = require('../controllers/ingestTransactionController')
const { handler: deleteCardController } = require('../controllers/deleteCardController')

router
    .route('/cards/users/:user_id')
    .get(retrieveCardController)

router 
    .route('/transactions/:user_id')
    .get(retrieveTransactionController)

router
    .route('/cards/users/:user_id')
    .post(ingestCardController)

router
    .route('/transactions/users/:user_id')
    .post(ingestTransactionController)

router
    .route('/cards/users')
    .delete(deleteCardController)

module.exports = router;