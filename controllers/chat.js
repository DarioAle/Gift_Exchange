"use strict";

const express = require('express');
const router = express.Router();
const config = require('./../shared');
const Chat = require('./../db/Chat');
const Post = require('./../db/Post');
const authMiddleware = require('./../middlewares/authMiddleware');

// /api/chat/:postId
router.route('/:postId')
    .get(authMiddleware.authenticate, (req, res) => {
        Chat.getAllMessages(req.params.postId, req.query.timestamp)
            .then(docs => {
                res.json(docs).end();
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({errors:["Internal error"]}).end();
            });
    })
    .post(authMiddleware.authenticate, (req, res) => {
        Chat.createMessage(req.body.timestamp, req.body.reciever, req.user.usuario, req.body.message, req.body.post)
            .then(doc => {
                res.status(201).json(doc).end();
            })
            .catch(err => {
                console.error(err);
                res.status(401).json({errors:[err]}).end();
            })
    })

router.get('/', authMiddleware.authenticate, (req, res) => {
    Chat.getConversations(req.user.usuario)
        .then(docs => {
            res.json(docs).end();
        })
        .catch(err => {
            res.status(401).json({errors:[err]}).end();
        })
});

module.exports = router;