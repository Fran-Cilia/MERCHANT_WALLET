const express = require('express');

const router = express.Router();

const teaController = require('../controllers/teaController')

router
    .route('/tea')
    .post(teaController.newTea);

module.exports = router;