"use strict";

const express = require('express');
const router = express.Router();
const config = require('./../shared');

// /api/chat/:giftID
router.route('/:giftID')
    .get((req, res) => {
        res.sendStatus(501);
    })
    .post((req, res) => {
        res.sendStatus(501);
    })

router.get('/', (req, res) => {
    res.sendStatus(501)
})

module.exports = router;