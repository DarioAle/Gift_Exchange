'use strict';

const config = require('./../config/parameters.json');
const JWT = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const User = require('./../db/User');

router.post('/login', (req, res) => {
    User.getByUsername(req.body.username)
        .then(result => {

        })
        .then(result => {
            let token = JWT.sign({
                    username: req.body.username
                },
                config.jwt.secret,
                {
                    issuer: config.jwt.issuer,
                    algorithm: config.jwt.algorithm,
                    subject: config.jwt.subject,
                    expiresIn: config.jwt.expiresIn,
                    jwtid: "1111"
                }
                );
            res.setHeader('X-Auth', token);
            res.status(201).json({ token });
        })
        .catch(err => {
            res.status(501).json({ errors: ["Internal server error"] });
        });
});
