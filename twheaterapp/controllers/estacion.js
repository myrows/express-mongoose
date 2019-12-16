'use strict'

const error_types = require('./error_types');

const Estacion = require('../models/estacion_meteorologica');
const _ = require('lodash');


module.exports = {

    createEstacion: (req, res) => {
        
        let ticket = new Ticket({
            lugar: req.body.lugar,
            puesto: req.body.puesto,
            tipo: req.body.tipo,
            comentario: req.body.comentario,
            propietario: req.user.id
        });

        ticket.save((err, ticket) => {
            if(err) res.send(500, err.message);
            res.status(201).json(ticket);
        })

    },
    getTodos: (req, res) => {

        try{

            let result = null;

            if(_.indexOf(req.user.rol, 'MANAGER') >= 0)
                result = await Estacion.find().populate('user', 'user_register', 'user_mant').exec();
            
            res.status(200).json(result);
        }catch(error){
            res.send(500, error.message);
        }
    }


}