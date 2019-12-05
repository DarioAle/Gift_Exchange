"use strict";

const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const config = require('./../shared');
const postModel = require('../db/Post');
const usereModel = require('../db/Post');
const authMiddleware = require('./../middlewares/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });

// Max ID from the post collection
async function getMaxIdPost() {
    let max_id;
       await postModel.find().sort({id:-1}).limit(1);
        console.log("Inside callback " + userpost[0].id);
        max_id = userpost[0].id;
    
    console.log("Inside fucntion " + max_id);
};


getMaxIdPost();




// /api/posts/winner-selector/:postId
router.patch('/winner-selector/:postId', authMiddleware.authenticate, (req, res) => {
    postModel.setWinner(req.params.postId, req.user.usuario, req.body.aquiredBy)
        .then(doc => {
            console.warn(doc);
            res.json(doc).end();
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ err: ["Internal server error"] });
        })
});

// /posts/histoy
router.get('/history', authMiddleware.authenticate, (req, res) => {
    postModel.findAllByPoster(req.user.usuario)
        .then(docs => res.json(docs).end)
        .catch(err => res.status(500).json({ err: ["Internal Server Error"] }));
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
    .patch(authMiddleware.authenticate, (req, res) => {
        console.log(chalk.magenta("Patching ruta /gift/" + req.params.postId))
        
        
        postModel.updateComments(req.params.postId)
                 .then(doc => {
                     doc.interesados.push({'usuario' : req.user.usuario, 'razon' : req.body.razon});
                     doc.save((err, doc) => {
                         if(err || doc == undefined) {
                            console.log(chalk.red("Error trying to add interested array"))
                            return;
                         }
                        res.status(200).end();
                        })
                        console.log(chalk.bgWhite.blue("Saved and updated with reason"))
                    })
                 .catch(err => {
                     console.log(chalk.red("Not bringing from DB " + err));
                     res.status(500).send()
                    })
    })
        
router.get('/adquired', authMiddleware.authenticate, (req, res) => {
    console.log("GG");
    let categoria = req.query.categoria || new RegExp(".*");
    let nombre = new RegExp(".*");
    if (req.query.nombre) {
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
    .delete(authMiddleware.authenticate, (req, res) => {
        postModel.deleteOneById(req.params.postId)
            .then(doc => {
                res.send();
            })
            .catch(err => {
                res.status(500).json({err: ["Delete error"]});
            });
    });


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

        let begin = qryLimit * (qrytPagina - 1);
        let pagedUsers = []

        res.status(200);
        postModel.getAllPosts()
            .then(u => {
                res.setHeader("x-posts-length", u.length);
                for (let i = begin; i < begin + (qryLimit * 1); i++) {
                    pagedUsers.push(u[i]);
                }
                res.send(pagedUsers);
            })
            .catch(e => console.log(chalk.red("Failed Retrieving all post from db " + e)));

    })

module.exports = router;