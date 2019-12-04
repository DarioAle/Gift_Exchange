'use strict';

const bcrypt = require('bcryptjs');

const express = require('express');

const router = express.Router();
const User = require('./../db/User');

const auth = require('./../middlewares/authMiddleware');

router.get('/me', auth.authenticate, (req, res) => {
    res.status(200).send(req.user);
});

router.route('/u/:usuario')
    .get((req, res) => {
        User.findOneByUsername(req.params.usuario)
            .then(doc => {
                res.json(doc);
            })
            .catch(err => {
                console.error(err);
                res.sendStatus(404);
            });
    });

router.post('/register', (req, res) => {
    let user = req.body;
    user.password = bcrypt.hashSync(user.password, 8);
    user.imagen = "/public/img/du.jpg";
    user.puntaje = 0;
    User.registerUser(user)
        .then(doc => {
            res.sendStatus(201);
        })
        .catch(err => {
            if (err.errmsg.includes("correo"))
                res.status(409).send("Correo ya registrado");
            else if (err.errmsg.includes("usuario"))
                res.status(409).send("Usuario ya registrado");
            else
                res.sendStatus(520);
        });
});

router.post('/validate', auth.authenticate, (req, res) => {
    res.status(200).send(req.user);
});

router.post('/update', auth.authenticate, (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
})

module.exports = router;