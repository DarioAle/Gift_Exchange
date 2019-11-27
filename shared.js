"use strict";

let config = {
    jwt: {
        issuer: "gift_exchange",
        subject: "authentication",
        expiresIn: 60 * 15,
        secret: process.env.JWT_SECRET || "shhhh"
    }
}

module.exports = config;