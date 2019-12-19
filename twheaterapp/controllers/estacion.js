'use strict'

const error_types = require('./error_types');

const Estacion = require('../models/estacion_meteorologica');
const Medicion = require('../models/medicion');
const _ = require('lodash');


module.exports = {

    createStation: (req, res) => {

        let estacion = new Estacion({
            name: req.body.name,
            location: req.body.location,
            user_register: req.body.user_register,
            user_mant: req.body.user_mant
        });

        estacion.save()
            .then(e => e.populate('user_register').execPopulate())
            .then(e => e.populate('user_mant').execPopulate())
            .then(e => res.status(201).json(e))
            .catch(error => res.send(500).json(error.message));

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
        if (_.indexOf(req.user.rol, 'MANAGER') >= 0)
            var query = { _id: req.params.id };
        Estacion.findByIdAndUpdate(query, { $addToSet: { name: req.body.name, location: req.body.location } }, { new: true }, (error, estacion) => {
            if (error) next(new error_types.Error500(error.message));
            if (estacion == null)
                next(new error_types.Error404('No se ha encontrado ninguna estación con ese id'))
            else
                res.status(200).json({
                    name: req.body.name,
                    location: req.body.location,
                    user_register: req.user.email,
                    user_register: req.user.fullname,
                    user_mant: req.user.email,
                    user_mant: req.user.fullname,
                });
        });

    },
    delStation: (req, res) => {
        Estacion.findByIdAndDelete(req.params.id)
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

    }

}