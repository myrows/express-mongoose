'use strict'

const error_types = require('./error_types');

const Medicion = require('../models/medicion');
const _ = require('lodash');


module.exports = {

    nuevaMedicion: (req, res) => {

        let medicion = new Medicion({
            user_register: req.user._id,
            user_mant: req.user._id,

            lluvia:  req.body.lluvia,
            velocidad_viento: req.body.v_viento,
            direccion_viento: req.body.d_viento,
            temperatura_ambiente: req.body.temp_ambiente,
            temperatura_suelo: req.body.temp_suelo,
            humedad: req.body.humedad,
            calidad_aire: req.body.c_aire,
            presion: req.body.presion,
            estacion_meteorologica:{ 
                type: Schema.ObjectId,
                ref: "Estacion"
            },
            fecha_hora:Date
        });

        medicion.save()
        .then(e => e.populate('user_register').execPopulate())
        .then(e => e.populate('user_mant').execPopulate())
        .then(e => res.status(201).json(e))
        .catch(error => res.send(500).json(error.message));

    }

}