
'use strict'

const _ = require('lodash')
const UserService = require('./user')


const tickets = [
    {
        id: 1,
        fecha: new Date(2019, 11, 29, 12, 35),
        lugar: "Aula 4",
        puesto: "AULA04-14",
        tipo: "OTRO",
        comentario: "Va lento :(",
        usuario: 5,
        tecnico: 1
    },
    {
        id: 2,
        fecha: new Date(2019, 11, 28, 10, 37),
        lugar: "Aula 1",
        puesto: "AULA01-PROFESOR",
        tipo: "SISTEMA_OPERATIVO",
        comentario: "Problemas de autenticación en el dominio",
        usuario: 4,
        tecnico: 2
    },
    {
        id: 3,
        fecha: new Date(2019, 11, 27, 8, 45),
        lugar: "Aula 8",
        puesto: "AULA08-08",
        tipo: "INTERNET",
        comentario: "Tiene señal de red pero no tiene internet. ¿Será de la configuración? ¿Es un problema del cable?",
        usuario: 2,
        tecnico: 2
    },
    {
        id: 4,
        fecha: new Date(2019, 11, 29, 13, 51),
        lugar: "Aula 2",
        puesto: "AULA02-03",
        tipo: "FISICO",
        comentario: "El ordenador hiperventila",
        usuario: 3,
        tecnico: 1
    },
]


let service = {    
    findAll: () => {
        return tickets.map((t) => { return {
            id: t.id,
            fecha: t.fecha,
            lugar: t.lugar,
            puesto: t.puesto,
            tipo: t.tipo,
            comentario: t.comentario,
            usuario: UserService.findById(t.usuario),
            tenico: UserService.findById(t.tecnico)
        }});
    },
    insertTicket : (ticket) => {
        let nuevoelemento = {
            id: tickets.length+1,
            fecha: new Date(),
            lugar: ticket.lugar,
            puesto: ticket.puesto,
            tipo: ticket.tipo,
            comentario: ticket.comentario,
            usuario: 3,
            tecnico: UserService.randomRepairman().id
        }
        tickets.push(nuevoelemento);
        nuevoelemento.usuario = UserService.findById(nuevoelemento.usuario);
        nuevoelemento.tecnico = UserService.findById(nuevoelemento.tecnico);
        return nuevoelemento;
    }
}

module.exports = service