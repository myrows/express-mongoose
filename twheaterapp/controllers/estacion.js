'use strict'

const error_types = require('./error_types');

const Estacion = require('../models/estacion_meteorologica');
const _ = require('lodash');


module.exports = {

    createStation: (req, res) => {

        let estacion = new Estacion({
            name: req.body.name,
            location: req.body.location,
            user_register: req.user._id,
            user_mant: req.user._id
        });

        estacion.save()
            .then(e => e.populate('user_register').execPopulate())
            .then(e => e.populate('user_mant').execPopulate())
            .then(e => res.status(201).json(e))
            .catch(error => res.send(500).json(error.message));

    },
    getAll: async (req, res) => {

        try {

            let result = null;

            if (_.indexOf(req.user.rol, 'MANAGER') >= 0)
                result = await Estacion.find().populate('user', 'user_register', 'user_mant').exec();

            res.status(200).json(result);
        } catch (error) {
            res.send(500, error.message);
        }
    },
    getById: async (req,res) => {
        

        try{

            let result = null;

            if(_.indexOf(req.user.rol, 'MANAGER') >= 0)
                result = await Estacion.findById({_id: req.params.id},function(err,doc){
                    if (err) throw err;
                });
            
            res.status(200).json(result);
        }catch(error){
            res.send(500, error.message);
        }
    },
    putStation: (req, res) => {
        if(_.indexOf(req.user.rol, 'MANAGER')>= 0)
        Estacion.findByIdAndUpdate(req.params.id, { $addToSet : {name: req.body.name, location: req.body.location}}, {new: true}, (error, estacion) => {
            if(error) next(new error_types.Error500(error.message));
            if(estacion == null)
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
        Estacion.findByIdAndDelete(req._id)
            .then(e => res.status(204))
            .catch(error => res.send(500).json(error.message));

    }

}