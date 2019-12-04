"use strict";

const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const config = require('./../shared');
const postModel = require('../db/Post');
const authMiddleware = require('./../middlewares/authMiddleware');

// /api/posts/winner-selector/:postId
router.patch('/winner-selector/:postId', authMiddleware.authenticate, (req, res) => {
    postModel.setWinner(req.params.postId, req.user.usuario, req.body.aquiredBy)
        .then(doc => {
            console.warn(doc);
            res.json(doc).end();
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({err: ["Internal server error"]});
        })
});

// /posts/histoy
router.get('/history', authMiddleware.authenticate, (req, res) => {
    postModel.findAllByPoster(req.user.usuario)
        .then(docs => res.json(docs).end)
        .catch(err => res.status(500).json({ err: ["Internal Server Error"] }));
})

router.get('/adquired', authMiddleware.authenticate, (req, res) => {
    console.log("GG");
    let categoria = req.query.categoria || new RegExp(".*");
    let nombre =  new RegExp(".*");
    if(req.query.nombre){
        nombre = new RegExp(".*" + req.query.nombre + ".*");
    }
    postModel.getAdquiredByUser(req.user.usuario, categoria, nombre)
        .then(docs => {
            res.json(docs);
        })
        .catch(err => {
            console.error(err);
            res.status(404);
        });        
});

router.route('/p/:postId')
    .get((req, res) => {
        postModel.findOneByPostId(req.params.postId)
            .then(doc => {
                res.json(doc);
            })
            .catch(err => {
                console.error(err);
                res.status(404);
            })
    })

router.route('/main')
    .get((req, res) => {
        console.log(chalk.green("Sí llegaste a la ruta"));
        res.status(200);
        postModel.getAllPosts()
            .then(u => {
                res.send(u);
            })
            .catch(e => console.log(chalk.red("Failed Retrieving all post from db " + e)));

    })
    .delete((req, res) => {

    })

module.exports = router;