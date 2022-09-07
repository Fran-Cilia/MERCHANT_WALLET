const express = require('express');

const router = express.Router();

const newTea = require('../controllers/teaController')

router
    .route('/tea')
    .post(newTea);

module.exports = router;