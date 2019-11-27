"use strict";

const config = require('./../shared');
const JWT = require('jsonwebtoken');
const User = require('./../db/User');

function authenticate(req, res, next) {
    let token;
    if (req.headers["x-auth"] == undefined) {
        res.status(401).send({ errors: ["NO X-AUTH HEADER"] }).end();
        return;
    }
    token = req.headers["x-auth"];
    JWT.verify(token, config.jwt.secret, {
        issuer: config.jwt.issuer,
        subject: config.jwt.subject,
        expiresIn: config.jwt.expiresIn
    }, function (verifyError, decoded) {
        if (verifyError) {
            res.status(401).send('INVALID X-AUTH HEADER').end();
            return;
        }
        User.findOneByUsernae(decoded.username)
            .then(function (user) {
                req.user = user;
                next();
            })
            .catch(function (userError) {
                console.error(userError);
                res.status(401).send('INVALID X-AUTH HEADER').end();
            })
    })
}

module.exports = {
    authenticate
}