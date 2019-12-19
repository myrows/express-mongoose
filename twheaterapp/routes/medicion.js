'use strict'

const express = require('express')
const router = express.Router()

const middleware = require('../middleware/index');
const MedicionController = require('../controllers/medicion')

router.post('/', MedicionController.nuevaMedicion);
router.get('/today', MedicionController.getAllWeatherToday);
router.get('/from/:from/to/:to',MedicionController.getMedicionesEntreFechas);
router.get('/:id', MedicionController.getById);


module.exports = router