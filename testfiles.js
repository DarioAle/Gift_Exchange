"use strict";

const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });
const loader = require('./utils/imageLoader');

let app = express();

app.post('/upload', upload.single('statement'), (req, res) => {
    console.log(req.file.filename);

    loader(req.file, (err, data) => {
        if(err){
            console.error(err);
            res.status(500);
            return;
        }
        res.send(data);
        return;
    })
});

app.listen(3000, () => {
    console.log("RUN");
})