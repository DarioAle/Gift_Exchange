'use strict';

const bcrypt = require('bcryptjs');
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });
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
    user.imagen = "/img/du.jpg";
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

router.post('/update', upload.single('statement'), auth.authenticate, (req, res) => {
    console.log("body----------");
    console.log(req.body);
    console.log("file----------");
    console.log(req.file);
    console.log("user----------");
    console.log(req.user.usuario);
    User.authenticate(req.user.usuario, req.body.password)
        .then((result) => {
            let change = {};
            if (req.body.usuario != '')
                change.nombre = req.body.nombre
            if (req.body.confpass != '')
                change.password = req.body.confpass
            if (req.body.correo != '')
                change.correo = req.body.correo
            if (req.file != undefined) {
                
            }
            User.updateUser(req.user.usuario, change);
            console.log("change----------");
            console.log(change);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log(err);
            res.status(401).send("Not authorized");
        });
})

module.exports = router;