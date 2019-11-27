'use strict';

const express = require('express');
const cors = require('cors');
const helment = require('helmet');

const authController = require('./controllers/auth');

let PORT = process.env.PORT || 3000;

let app = express();

app.use(cors());
app.use(helment());
app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.use('/api/auth', require('./middlewares/authMiddleware').authenticate, authController);

app.listen(PORT, (e) => {
    console.info("App running at port " + PORT);
});
