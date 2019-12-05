"use strict";

const express = require('express');
const app = express();
const config = require('./shared');
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });

app.post('/upload', upload.array('statement', 4), (req, res) => {
    console.log(req.files);
    res.send("");
});

app.listen(3000, () => {
    console.log("RUN");
});
