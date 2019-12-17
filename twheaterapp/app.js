'use strict'

const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const passport = require("passport");
const JwtStrategy = require('passport-jwt').Strategy;
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const bcrypt = require('bcryptjs');
const user_routes = require('./routes/users');
const ticket_routes = require('./routes/tickets');
const middleware = require('./middleware/index'); 
const UserService = require('./services/user');
require('dotenv').config();

/* ##### MONGO ##### */

const mongoose = require('mongoose');

const User = require('./models/user_tickets');

mongoose.connect(process.env.MONGODB_CONNECT_URI, {useNewUrlParser: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', () => {
    console.log('Conectado!');
});


// Busca el usuario que quiere hacer el login, comprueba su email o username y luego compara password
passport.use(new LocalStrategy((username, password, done) => {
    let busqueda = (username.includes('@')) ? { email: username } : { username: username };
    User.findOne(busqueda, (err, user) => {
        if(err) return done(null, false);
        if(!bcrypt.compareSync(password, user.password)) {
            return done(null, false);
        }
        return done(null, user);
    });
}));

let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;
opts.algorithms = [process.env.JWT_ALGORITHM];

// Encuentra un usuario por id con la información del token
passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    /* let data = UserService.findById(jwt_payload.sub); */
    User.findById(jwt_payload.sub, (err, user) => {
        if(err) return done(null, false);
        else return done(null, user);
    });
    /* if (data === null)
        return done(null, false);
    else
        return done(null, data); */
}));

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(passport.initialize())

app.use('/api/', user_routes);
app.use('/api/tickets/', ticket_routes);
app.use(middleware.errorHandler);
app.use(middleware.notFoundHandler);

module.exports = app