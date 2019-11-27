"use strict";

const db = require('./mongodb-connect');
const bcrypt = require('bcryptjs');
const userProjectionMask = {
    _id: 0,
    username: 1,
    nombre: 1,
    correo: 1,
    imagen: 1,
    puntaje: 1,
    password: 0
};

const schema = db.Schema({
    nombre: {
        type: String,
        required: true
    },
    usuario: {
        type: String,
        required: true,
        unique: true
    },
    correo: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        required: true
    },
    puntaje: {
        type: Number,
        required: true
    }
});

schema.statics.authenticate = function(username, password) {
    return new Promise(function (resolve, reject){
        db.model('User').findOne({"username": username}, function (err, user) {
            if(err || user == undefined){
                reject(err);
                return;
            }
            
            bcrypt.compare(password, user.password, function(err, ok) {
                if(ok){
                    resolve(true);
                    return;
                }else if(err){
                    reject(err);
                    return;
                }else{
                    reject("Bad password");
                }
            });
        });
    });
}

schema.statics.findOneByUsernae = function(username) {
    return new Promise(function (resolve, reject) {
        db.model('User').findOne({username}, function (err, user) {
            if(err || user == undefined){
                reject(err);
                return;
            }
            resolve(user);
        });
    });
}

const User = db.model('User', schema);

module.exports = User;