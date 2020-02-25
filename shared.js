"use strict";

let config = {
    jwt: {
        issuer: "gift_exchange",
        subject: "authentication",
        expiresIn: 60 * 60,
        secret: process.env.JWT_SECRET || "shhhh"
    },
    aws:{
        ACCESS_KEY: "AKIA2KGI25JOJ2YZ2APM",
        SECRET_KEY: "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",
        bucketName: "gift-exchange"
    }
}

module.exports = config;