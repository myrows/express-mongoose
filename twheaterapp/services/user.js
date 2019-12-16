
'use strict'

const _ = require('lodash')
const bcrypt = require('bcryptjs')

const users = [
    {
        id: 1,
        username: "luismi",
        email: "luismi.lopez@salesianos.edu",
        fullname: "Luis Miguel López Magaña",
        roles: [ "INFORMADOR", "TECNICO"],
        password: bcrypt.hashSync("12345", parseInt(process.env.BCRYPT_ROUNDS))
    },
    {
        id: 2,
        username: "miguel",
        email: "miguel.campos@salesianos.edu",
        fullname: "Miguel Campos Rivera",
        roles: [ "INFORMADOR", "TECNICO"],
        password: bcrypt.hashSync("67890", parseInt(process.env.BCRYPT_ROUNDS))   
    },
    {
        id: 3,
        username: "angel",
        email: "angel.naranjo@salesianos.edu",
        roles: ["INFORMADOR"],
        password: bcrypt.hashSync("lasnavaspuntocom", parseInt(process.env.BCRYPT_ROUNDS))   
    },
    {
        id: 4,
        username: "rafa",
        email: "rafael.villar@salesianos.edu",
        fullname: "Rafael Villar Liñán",
        roles: [ "INFORMADOR", "TECNICO"],
        password: bcrypt.hashSync("pataitaporbuleria", parseInt(process.env.BCRYPT_ROUNDS))   
    },
    {
        id: 5,
        username: "jesus",
        email: "jesus.casanova@salesianos.edu",
        fullname: "Jesús Casanova Domínguez",
        roles: ["INFORMADOR"],
        password: bcrypt.hashSync("vivalavirgendelvalle", parseInt(process.env.BCRYPT_ROUNDS))   
    }


]


let service = {
    findUser: (user) => {
        return _.find(users, u => (u.username == user.username) || (u.email == user.email));
    },
    findById: (id) => {
        let result =  _.find(users, u => u.id == id);
        delete result.password;
        return result;
    },
    findByRol: (rol) => {
        return _.filter(users, u => _.includes(u.roles, rol));
    },
    randomRepairman: function() {
        const repairmans = this.findByRol("TECNICO");        
        return repairmans[_.random(0,repairmans.length-1)];
    },
    insertUser : (user) => {
        return users.push({
            id: users.length,
            email: user.email,
            fullname: user.fullname,
            username: user.username,
            password: user.password
        });
    }
}

module.exports = service