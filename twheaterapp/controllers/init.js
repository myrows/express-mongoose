'use strict'

const error_types = require('./error_types');

const Estacion = require('../models/estacion_meteorologica');
const Medicion = require('../models/medicion');
const User = require('../models/user')
const _ = require('lodash');
var moment = require('moment');
const mongoose = require('mongoose');







module.exports = {

    insertAll: async(req, res) => {
        var ObjectId = mongoose.Types.ObjectId;

        const weathers = [{

            },
            {

            }
        ]

        const stations = [{

        }]

        var users = [{
                "_id": new ObjectId("56955ca46063c5600627f393"),
                "fullname": "user",
                "username": "user",
                "password": "user",
                "email": "user",
                "estacion_register": null,
                "estacion_mant": null,
                "rol": "USER"
            },
            {
                "_id": new ObjectId("56955ca46063c5600627f394"),
                "fullname": "manager",
                "username": "manager",
                "password": "manager",
                "email": "manager",
                "estacion_register": null,
                "estacion_mant": null,
                "rol": "MANAGER"
            },
            {
                "_id": new ObjectId("56955ca46063c5600627f395"),
                "fullname": "admin",
                "username": "admin",
                "password": "admin",
                "email": "admin",
                "estacion_register": null,
                "estacion_mant": null,
                "rol": "ADMIN"
            }
        ]


        await User.collection.insertMany(users);
        await Estacion.collection.insert(stations);
        await Medicion.collection.insert(weathers);

        res.send(201, "Base de datos creada");


    }

}

// https://stackoverflow.com/questions/35025090/how-to-insert-a-custom-objectid-with-collection-insert-in-mongoose