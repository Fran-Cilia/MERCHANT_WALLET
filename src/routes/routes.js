const express = require('express');

const router = express.Router();

const newTea = require('../controllers/teaController')
const { handler:retrieveCardController } = require('../controllers/retrieveCardController')

router
    .route('/tea')
    .post(newTea);

router
    .route('/cards/:user_id')
    .get(retrieveCardController)

module.exports = router;