const express = require('express');

const router = express.Router();

const newTea = require('../controllers/teaController')
const { handler: retrieveCardController } = require('../controllers/retrieveCardController')
const { handler: retrieveTransactionController } = require('../controllers/retrieveTransactionController')
const { handler: ingestCardController } = require('../controllers/ingestCardController')
const { handler: ingestTransactionController } = require('../controllers/ingestTransactionController')

router
    .route('/tea')
    .post(newTea);

router
    .route('/cards/users/:user_id')
    .get(retrieveCardController)

router 
    .route('/transactions')
    .get(retrieveTransactionController)

router
    .route('/cards/users/:user_id')
    .post(ingestCardController)

router
    .route('/transactions/users/:user_id')
    .post(ingestTransactionController)

module.exports = router;