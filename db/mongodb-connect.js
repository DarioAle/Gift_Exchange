"use strict";

const mongo = require("mongoose");
const configUsername = process.env.DB_USERNAME || "mastercontrol";
const configPassword = process.env.DB_PASSWORD || "mastercontrol";
const configDBname = process.env.DB_NAME || "dasw-myapp";
const PATH = `mongodb+srv://${configUsername}:${configPassword}@dasw-cluster-ju1lk.mongodb.net/${configDBname}?retryWrites=true&w=majority`

mongo.connect(PATH, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(r => {
    console.log("Connected");
}).catch(err => {
    console.log(err);
});

module.exports = mongo;