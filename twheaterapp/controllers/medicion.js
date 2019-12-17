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

    },
    getAllWeatherToday: (req, res) => {

            const moment = require('moment')
            const start = moment().startOf('day');
            const end = moment().endOf('day');
            /* let start = new Date(now.getFullYear(),now.getMonth(),now.getDate(),1,0,0);
            let end = new Date(now.getFullYear(),now.getMonth(),now.getDate()+1,0,59,59); */

            if(_.indexOf(req.user.rol == 'USER') >= 0)
                Medicion.find({fecha_hora: {'$gte': start, '$lte': end}})
                .sort({fecha_hora: 1})
                .populate('estacion_meteorologica')
                .exec(function(err, medicion){
                    if(err) res.send(500, err.message);
                    res.status(200).json({
                        estacion_meteorologica: medicion.estacion_meteorologica.name,
                        location: medicion.estacion_meteorologica.location,
                        user_register: medicion.estacion_meteorologica.user_register,
                        user_mant: medicion.estacion_meteorologica.user_mant,
                        lluvia: medicion.lluvia,
                        velocidad_viento: medicion.velocidad_viento,
                        direccion_viento: medicion.direccion_viento,
                        temperatura_ambiente: medicion.temperatura_ambiente,
                        temperatura_suelo: medicion.temperatura_suelo,
                        humedad: medicion.humedad,
                        calidad_aire: medicion.calidad_aire,
                        presion: medicion.presion,
                        fecha_hora: medicion.fecha_hora
                    });
                });
            else{
                return next(new error_types.Error403('No tienes rol USER'))
            }




    }

}