"use strict";

const express = require('express');
const router = express.Router();
const chalk = require('chalk');
const config = require('./../shared');
const postModel = require('../db/Post');
const usereModel = require('../db/User');
const authMiddleware = require('./../middlewares/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'tmp/' });
const imageLoader = require('./../utils/imageLoader');

// Max ID from the post collection
async function getMaxIdPost() {
    let max_post = await postModel.find().sort({ id: -1 }).limit(1);
    console.log(chalk.magenta(max_post[0].id));
    return max_post[0].id;
};

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

// Give details of a gift and add reasons on why you deserve it
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
                doc.interesados.push({ 'usuario': req.user.usuario, 'razon': req.body.razon });
                doc.save((err, doc) => {
                    if (err || doc == undefined) {
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

// Gifts that you have received happily    
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

// Delete a post
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
                res.status(500).json({ err: ["Delete error"] });
            });
    });

router.patch('/p/:postId/finalize', authMiddleware.authenticate, (req, res) => {
    let postId = req.params.postId;
    let score = req.body.score;
    postModel.finalize(postId)
        .then(owner => {
            return usereModel.updateScore(owner, score);
        })
        .then(doc => {
            console.log("HOla", doc);
            res.sendStatus(200);
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        })
});

// Requests made in the fron page where all the available posts 
// are shown
router.route('/main')
    .get((req, res) => {
        console.log(chalk.green("Sí llegaste a la ruta /main en index"));

        let qrytPagina = req.query.pagina;
        let qryLimit = req.query.limit;
        let qryNombre = req.query.nombre || "";

        if (qryNombre != "") {
            console.log("vamos a filtrar");
            usersToSend = usersToSend.filter((e) => {
                return e.nombre.toUpperCase().includes(qryNombre.toUpperCase()) ||
                    e.nombre.includes(qryNombre) ||
                    e.apellido.toUpperCase().includes(qryNombre.toUpperCase()) ||
                    e.apellido.includes(qryNombre);
            });
        };

        let begin = qryLimit * (qrytPagina - 1);
        let pagedUsers = [];

        res.status(200);
        postModel.getAllPosts()
            .then(x => {
                let u = x.filter(e => e.postIsActive);
                if (req.query.namefilter != undefined)
                    u = u.filter(e => e.nombrePost.toUpperCase().match(req.query.namefilter.toUpperCase() + ".*"));
                if (req.query.catfilter != undefined)
                    u = u.filter(e => e.category == req.query.catfilter);
                res.setHeader("x-posts-length", u.length);
                for (let i = begin; i < begin + (qryLimit * 1); i++) {
                    pagedUsers.push(u[i]);
                }
                res.send(pagedUsers);
            })
            .catch(e => console.log(chalk.red("Failed Retrieving all post from db " + e)));

    })

router.post('/', upload.array('statement', 4), authMiddleware.authenticate, async (req, res) => {
    console.log(req.body);
    console.log(req.files);
    let maxId = await getMaxIdPost();
    console.log("max id: " + chalk.yellow(maxId));
    let newUser = req.body;
    newUser.id = maxId + 1;
    newUser.owner = req.user.usuario;
    newUser.date = Date.now();
    newUser.postIsActive = true;
    newUser.interesados = [];
    newUser.comments = [];
    newUser.image = [];
    postModel.registerPost(newUser)
        .then(doc => {
            res.status(201).json(doc);
        })
        .catch(err => {
            console.error(err);
            res.sendStatus(500);
        });
});

// ad a post associated to a user
router.route('/newGiftEntry')
    .put(upload.single('statement', 4), authMiddleware.authenticate, async (req, res) => {
        console.log(chalk.cyan("ruta new giftEntry"));
        let maxId = await getMaxIdPost();
        console.log("max id: " + chalk.yellow(maxId));
        let postObject = req.body;
        postObject.id = maxId + 1;
        postObject.date = new Date();
        postObject.owner = req.user.usuario;
        postObject.postIsActive = true;
        postObject.interesados = [];
        postObject.comments = [];
        postObject.image = [];
        postModel.registerPost(postObject)
            .then(doc => {
                console.log(chalk.blue("Post added succesfully" + doc))
                imageLoader(req.file, (err, data) => {
                    if (err) {
                        console.error(err);
                        res.sendStatus(500);
                    } else {
                        doc.image.push(data);
                        console.log(doc);
                        doc.save((err, t) => {
                            if (err) {
                                console.error(err);
                                res.sendStatus(500);
                            } else {
                                console.log(t);
                                res.status(201).json(t);
                            }
                        })
                    }
                });
            })
            .catch(e => console.log(chalk.red("Error adding new post " + e)))
    })

router.get('/favorites', authMiddleware.authenticate, (req, res) => {
    const username = req.query.username;
    console.log(chalk.bgWhite.yellow("Looking for favorites for: " + username))
    postModel.getAllPosts()
        .then(u => {
            let favorites = u.map((e, i) => {
                let filtered = e.interesados.filter(e => {
                    return e.usuario == username;
                });
                if (filtered.length != 0)
                    return e;
            }).filter(e => e != null);
            res.status(200).send(favorites);
        })
        .catch(e => {
            console.log(chalk.red("Failed finding favorites " + e))
            res.status(500).send()
        });
});
module.exports = router;