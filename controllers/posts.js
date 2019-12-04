"use strict";

const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const config = require('./../shared');
const postModel = require('../db/Post');
const usereModel = require('../db/Post');
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

router.route('/gift/:postId')
    .get((req, res) => {
        console.log(chalk.magenta("ruta /gift/" + req.params.postId))
        postModel.findOnePostById(req.params.postId)
                 .then(doc => {
                     res.status(200).send(doc)
                    })
                 .catch(err => {
                     console.log(chalk.red("Not bringing from DB " + err));
                     res.status(500).send()
                    })
        
    })

// Requests made in the fron page where all the available posts 
// are shown
router.route('/main')
.get((req, res) => {
    console.log(chalk.green.bgBlue("Sí llegaste a la ruta /main en index"));

    let qrytPagina = req.query.pagina;
    let qryLimit   = req.query.limit;
    let qryNombre  = req.query.nombre || "";
    
    if(qryNombre != "") {
        console.log("vamos a filtrar");
        usersToSend = usersToSend.filter( (e) => {
            return e.nombre.toUpperCase().includes(qryNombre.toUpperCase())   ||
                e.nombre.includes(qryNombre)                               ||
                e.apellido.toUpperCase().includes(qryNombre.toUpperCase()) ||
                e.apellido.includes(qryNombre);
        });
    };

    let begin = qryLimit * (qrytPagina  - 1);
    let pagedUsers = []

    res.status(200);
    postModel.getAllPosts()
            .then(u => {
                res.setHeader("x-posts-length",u.length);
                for(let i = begin; i < begin + (qryLimit * 1); i++) {
                    pagedUsers.push(u[i]);
                }
                res.send(pagedUsers);
            })
            .catch( e => console.log(chalk.red("Failed Retrieving all post from db " + e)));
        
    })

module.exports = router;