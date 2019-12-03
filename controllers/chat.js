"use strict";

const express = require('express');
const router = express.Router();
const config = require('./../shared');
const Chat = require('./../db/Chat')

// /api/chat/:postId
router.route('/:postId')
    .get((req, res) => {
        Chat.getConversations(req.params.postId, new Date().getTime())
            .then(docs => {
                res.json(docs).end();
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({errors:["Internal error"]}).end();
            });
    })
    .post((req, res) => {
        Chat.createMessage(req.body.timestamp, req.body.reciever, req.user.username, req.body.message, req.body.post)
            .then(doc => {
                res.status(201).json(doc).end();
            })
            .catch(err => {
                console.error(err);
                res.status(401).json({errors:[err]}).end();
            })
    })

router.get('/', (req, res) => {
    res.sendStatus(501)
})

module.exports = router;