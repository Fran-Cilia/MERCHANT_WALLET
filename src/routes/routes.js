const express = require('express');

const router = express.Router();

const newTea = require('../controllers/teaController')
const { handler: retrieveCardController } = require('../controllers/retrieveCardController')
const { handler: retrieveTransactionController } = require('../controllers/retrieveTransactionController')

router
    .route('/tea')
    .post(newTea);

router
    .route('/cards/:user_id')
    .get(retrieveCardController)

router 
    .route('/transactions')
    .get(retrieveTransactionController)

module.exports = router;