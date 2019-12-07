"use strict";

const db = require('./mongodb-connect');
const bcrypt = require('bcryptjs');
const userProjectionMask = {
    _id: 0,
    usuario: 1,
    nombre: 1,
    apellido: 1,
    correo: 1,
    imagen: 1,
    puntaje: 1
};

const schema = db.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
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
    evaluaciones: {
        type: Number,
        required: true
    },
    puntaje: {
        type: Number,
        required: true
    }
});

schema.statics.updateScore = function(username, score) {
    return new Promise((resolve, reject) => {
        db.model('User').findOne({ "usuario" : username }, (err, doc) => {
            let evaluaciones = 0;
            if(err){
                reject(err);
                return;
            }
            score = score * 1.0;
            evaluaciones = 1.0 * (doc.evaluaciones || 1);
            console.log(evaluaciones, typeof(evaluaciones));
            let current = evaluaciones * doc.puntaje;
            console.log(current, typeof(current));
            console.log(score, typeof(score));
            console.log((evaluaciones + 1.0), typeof((evaluaciones + 1.0)));
            doc.puntaje = (current + score) / (evaluaciones + 1.0);
            doc.evaluaciones = evaluaciones + 1.0;
            doc.save((err, data) => {
                if(err){
                    reject(err);
                    return;
                }
                resolve(data);
            })
        });
    });
}

schema.statics.authenticate = function (username, password) {
    return new Promise(function (resolve, reject) {
        db.model('User').findOne({ "usuario" : username }, {
                _id: 0, 
                usuario: 1, 
                password: 1 
            }, function (err, user) {
            if (err) {
                reject(err);
                return;
            }else if (!user) {
                reject(false);
                return;
            }

            bcrypt.compare(password, user.password, function (err, ok) {
                if (ok) {
                    resolve(true);
                    return;
                } else if (err) {
                    reject(err);
                    return;
                } else {
                    reject("Bad password");
                }
            });
        });
    });
}

schema.statics.findOneByUsername = function (username) {
    return new Promise(function (resolve, reject) {
        db.model('User').findOne({ 'usuario' : username }, userProjectionMask, function (err, user) {
            if (err || user == undefined) {
                reject(err);
                return;
            }
            resolve(user);
        });
    });
}

schema.statics.registerUser = function(user) {
    return new Promise((resolve, reject) => {
        user.puntaje = 1;
        user.evaluaciones = 0;
        let newUser = User(user);
        newUser.save((err, product) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(product);
        });
    });
}

schema.statics.getUsers = function() {
    return new Promise((resolve, reject) => {
        db.model('User').find({}, (err, docs) =>{
            if(err) {
                reject(err);
                return;
            }
            resolve(docs);
        });
    });
}

schema.statics.updateUser = function(user, change) {
    db.model('User').findOneAndUpdate({"usuario" : user}, {$set : change}, {new: true}, (err, docs) =>{
        if(docs)
            console.log(docs);
    });
}

const User = db.model('User', schema);

module.exports = User;