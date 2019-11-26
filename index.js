'use strict';

const express = require('express');
const cors = require('cors');
const helment = require('helmet');
const router = require('./routes/router');

let PORT = process.env.PORT || 3000;

let app = express();

app.use(cors());
app.use(helment());
app.use(router);

app.listen(PORT, (e) => {
    console.info("App running at port " + PORT);
});