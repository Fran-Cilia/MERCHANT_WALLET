const express = require('express');

const router = express.Router();

const newTea = require('../controllers/teaController')
const { handler: retrieveCardController } = require('../controllers/retrieveCardController')
const { handler: retrieveTransactionController } = require('../controllers/retrieveTransactionController')
const { handler: ingestCardController } = require('../controllers/ingestCardController')

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

module.exports = router;