'use strict'

const error_types = require('./error_types');

const Medicion = require('../models/medicion');
const _ = require('lodash');


module.exports = {

    nuevaMedicion: (req, res) => {

        let medicion = new Medicion({

            lluvia:  req.body.lluvia,
            velocidad_viento: req.body.v_viento,
            direccion_viento: req.body.d_viento,
            temperatura_ambiente: req.body.temp_ambiente,
            temperatura_suelo: req.body.temp_suelo,
            humedad: req.body.humedad,
            calidad_aire: req.body.c_aire,
            presion: req.body.presion,
            estacion_meteorologica: req.estacion._id,
            fecha_hora:Date.now()

        });

        medicion.save()
        .then(e => e.populate('estacion_meteorologica').execPopulate())
        .then(e => res.status(201).json(e))
        .catch(error => res.send(500).json(error.message));

    }

}