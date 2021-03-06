'use strict';

const config = require('./../shared');
const JWT = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const User = require('./../db/User');

router.post('/login', function (req, res) {
    if (req.body.username == undefined) {
        res.status(401).json({ errors: ["No username"] });
        return;
    }
    if (req.body.password == undefined) {
        res.status(401).json({ errors: ["No password"] });
        return;
    }

    User.authenticate(req.body.username, req.body.password)
        .then(function (result) {
            let token = JWT.sign({
                username: req.body.username
            },
                config.jwt.secret,
                {
                    issuer: config.jwt.issuer,
                    subject: config.jwt.subject,
                    expiresIn: config.jwt.expiresIn
                }
            );
            res.setHeader('X-Auth', token);
            res.status(201).json({ token });
        })
        .catch(function (err) {
            console.log(err);
            if (err === false) {
                res.status(404).json({ errors: ["User not found"] });
            } else if (err == "Bad password") {
                res.status(401).json({ errors: [err] });
            }
            else {
                res.status(501).json({ errors: ["Internal server error"] });
            }
        });
});

module.exports = router;