'use strict'

const error_types = require('./error_types');

const Estacion = require('../models/estacion_meteorologica');
const Medicion = require('../models/medicion');
const User = require('../models/user')
const _ = require('lodash');
var moment = require('moment');
const mongoose = require('mongoose');



function insertWeather(docs) {
    Medicion.collection.insert(docs);
}

function insertStation(docs) {
    Estacion.collection.insert(docs);
}

function insertUser() {
    User.collection.insert(docs);
}



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
            "fullname": "Elfattiga",
            "username": "User",
            "password": "User",
            "email": "User",
            "estacion_register": null,
            "estacion_mant": "ADMIN"
        }]


        await User.collection.insertMany(users);

        res.send(201, "Base de datos creada");


    }

}

// https://stackoverflow.com/questions/35025090/how-to-insert-a-custom-objectid-with-collection-insert-in-mongoose