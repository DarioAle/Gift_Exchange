"use strict";

const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const config = require('./../shared');
const postModel = require('../db/Post');
const authMiddleware = require('./../middlewares/authMiddleware');

// /posts/winner-selector/:giftId
router.route('/winner-selector/:giftId')
    .get(authMiddleware.authenticate, (req, res) => {
        res.send(501);
    })
    .patch(authMiddleware.authenticate, (req, res) => {
        res.send(501);
    });

// /posts/histoy
router.get('/history', authMiddleware.authenticate, (req, res) => {
    postModel.findAllByPoster(req.user.usuario)
        .then(docs => res.json(docs).end)
        .catch(err => res.status(500).json({err: ["Internal Server Error"]}));
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