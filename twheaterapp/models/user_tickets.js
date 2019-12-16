'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema({
    username: String,
    email: String,
    fullname: String,
    roles: [{type: String, enum: ['INFORMADOR', 'TECNICO', 'ADMIN']}],
    password: String,
    tickets: [{ type: Schema.Types.ObjectId, ref: 'Ticket'}]
});

const ticketSchema = Schema({
    fecha: {type: Date, default: Date.now},
    lugar: {type: String},
    puesto: {type: String},
    tipo: {type: String, enum: [
        'OTROS', 'SISTEMA_OPERATIVO', 'INTERNET', 'FISICO'
    ]},
    comentario: {type: String},
    propietario: {type: Schema.Types.ObjectId, ref: 'User'}
});


module.exports = mongoose.model('User', userSchema);
module.exports = mongoose.model('Ticket', ticketSchema);