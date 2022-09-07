const express = require('express');

const router = express.Router();

const newTea = require('../controllers/teaController')
const addCardController = require('../controllers/addCardController')

router
    .route('/tea')
    .post(newTea);

module.exports = router;