'use strict'

const express = require('express')
const router = express.Router()

const middleware = require('../middleware/index');
const EstacionController = require('../controllers/estacion')

router.post('/', EstacionController.createStation);
router.get('/', EstacionController.getAll);
router.get('/:id', EstacionController.getById);
router.put('/:id', EstacionController.putStation);
router.delete('/:id', EstacionController.delStation);
router.get('/:id/today', EstacionController.getSummaryOfToday);




module.exports = router