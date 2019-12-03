"use strict";

const express = require('express');
const router = express.Router();
const config = require('./../shared');

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

module.exports = router;