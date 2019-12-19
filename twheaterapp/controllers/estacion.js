'use strict'

const error_types = require('./error_types');

const Estacion = require('../models/estacion_meteorologica');
const Medicion = require('../models/medicion');
const User = require('../models/user');
const _ = require('lodash');
var moment = require('moment');
const USER_LEVEL = 0;
const MANAGER_LEVEL = 1;
const ADMIN_LEVEL = 2;



module.exports = {

    createStation: (req, res) => {
        if (req.user.rol === 'USER') {
            res.status(401).json('No tiene acceso a este recurso');
        } else {
            let estacion = new Estacion({
                name: req.body.name,
                location: req.body.location,
                user_register: req.user._id,
                user_mant: req.body.user_mant
            });

            estacion.save()
                .then(e => e.populate('user_register').execPopulate())
                .then(e => e.populate('user_mant').execPopulate())
                .then(e => res.status(201).json(e))
                .catch(error => res.send(500).json(error.message));
            
            req.user.estacion_register.push(estacion._id);
            
        }
    },
    getAll: async(req, res) => {

        let result = null;

        if (_.indexOf(req.user.rol, 'MANAGER') >= 0)
            result = await Estacion.find().populate('user', 'user_register', 'user_mant').exec();

        res.status(200).json(result);

        res.send(500, error.message);

    },
    getById: async(req, res) => {

        let result = null;
        //if (_.indexOf(req.user.rol, 'MANAGER') >= 0){          

        const _id = req.params._id;
        Estacion.findById(_id)
            .populate('user_register')
            .populate('user_mant')
            .exec(function(err, estacion) {
                if (err) res.send(500, err.message);
                res.status(200).json({

                    estacion: estacion

                });



            });
        /*   } else {
              next(new error_types.Error401('No estás autorizado con el rol de MANAGER'));
          } */



    },
    putStation: (req, res) => {
        /*             if ((req.user.rol, 'MANAGER')) */
        const _id = req.params.id;
        Estacion.replaceOne({ _id }, { name: req.body.name, location: req.body.location })
            .populate({ path: 'user_register', select: ['username', 'email'] })
            .populate({ path: 'user_mant', select: ['username', 'email'] })
            .exec(function(err, estacion) {
                if (err) res.send(500, err.message);
                res.status(201).json({
                    estacion: estacion
                })

            })

    },
    delStation: (req, res) => {
        Estacion.findByIdAndDelete(req.params._id)
            .then(e => res.status(204))
            .catch(error => res.send(500).json(error.message));

    },

    getWeatherOfStation: (req, res) => {
        Medicion
            .find({ estacion_meteorologica: req.params.id })
            .populate('estacion_meteorologica')
            .exec(function(err, medicion) {
                if (err) res.send(500, err.message);
                res.status(200).json({
                    name: medicion.estacion_meteorologica.name,
                    location: medicion.estacion_meteorologica.location,
                    user_register: medicion.estacion_meteorologica.user_register,
                    user_mant: medicion.estacion_meteorologica.user_mant,
                    mediciones: medicion
                })
            });

    },

    getSummaryOfToday: (req, res) => {

        const start = moment().startOf('day').format();
        const end = moment().endOf('day').format();

        Medicion.aggregate([
            { $match: { fecha_hora: { $gte: start, $lte: end } } },
            { $group: { _id: req.params.id, temp_max: { $max: "$temperatura_ambiente" }, temp_min: { $min: "$temperatura_ambiente" }, media: { $avg: "$temperatura_ambiente" } } },
            { $sort: { fecha_hora: 1 } }
        ]).exec(function(err, medicion) {
            if (err) {
                return handleError(err);
            } else {
                res.status(200).json({ medicion: medicion });
            }
        })
    },
    getWeatherOfStationByDate: (req, res) => {
        const _id = req.params.id;
        const from = req.params.from;
        const to = req.params.to;
        const start = moment(from).format();
        const end = moment(to).format();
        Medicion.find({ estacion_meteorologica: _id, fecha_hora: { $gte: start, $lte: end } })
            .populate({ path: 'estacion_meteorologica', populate: { path: 'user_register', select: ['username', 'email'] } })
            .populate({ path: 'estacion_meteorologica', populate: { path: 'user_mant', select: ['username', 'email'] } })
            .exec(function(err, medicion) {
                if (err) res.send(500, err.message);
                res.status(200).json({
                    medicion: medicion
                })
            })
    }

}