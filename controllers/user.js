'use strict';

const bcrypt = require('bcryptjs');

const express = require('express');
const router = express.Router();
const User = require('./../db/User');

router.get('/get', (req, res) => {
    res.send(User.getUsers());

});

router.post('/register', (req, res) => {
    let user = req.body;
    user.password = bcrypt.hashSync(user.password, 8);
    user.imagen = "./public/img/du.jpg";
    user.puntaje = 0;
    User.registerUser(user).then(doc => {
        res.sendStatus(201);
    })
    .catch(err => {
        if(err.errmsg.includes("correo"))
            res.status(409).send("Correo ya registrado");
        else if(err.errmsg.includes("usuario"))
            res.status(409).send("Usuario ya registrado");
        else
            res.sendStatus(520);
    });
});

module.exports = router;