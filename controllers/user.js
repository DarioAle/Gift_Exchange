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
    user.imagen = "";
    user.puntaje = 0;
    User.registerUSer(user);
});

module.exports = router;