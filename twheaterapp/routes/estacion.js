'use strict'

const express = require('express')
const router = express.Router()

const middleware = require('../middleware/index');
const EstacionController = require('../controllers/estacion')

router.post('/', EstacionController.createEstacion);
router.get('/', EstacionController.getTodos);



module.exports = router