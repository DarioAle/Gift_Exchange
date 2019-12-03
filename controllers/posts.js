"use strict";

const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const config = require('./../shared');
const postModel = require('../db/Post');

// /posts/winner-selector/:giftId
router.route('/winner-selector/:giftId')
    .get((req, res) => {
        res.send(501);
    })
    .patch((req, res) => {
        res.send(501);
    });

// /posts/histoy
router.get('/history', (req, res) => {
    res.send(501);
})

router.route('/main')
    .get((req, res) => {
        console.log(chalk.green("Sí llegaste a la ruta"));
        res.status(200);
        postModel.getAllPosts()
                .then(u => {
                    res.send(u);
                })
                .catch( e => console.log(chalk.red("Failed Retrieving all post from db " + e)));
        
    })
    .delete((req, res) => {

    })

module.exports = router;