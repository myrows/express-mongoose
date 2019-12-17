'use strict'

const express = require('express')
const router = express.Router()

const middleware = require('../middleware/index');
const MedicionController = require('../controllers/medicion')

router.post('/', MedicionController.nuevaMedicion);


module.exports = router