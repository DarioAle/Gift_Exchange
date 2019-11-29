'use strict';


const express = require('express');
const router = express.Router();
const User = require('./../db/User');

router.get('/:username', (req, res) => {
    console.log(req.params);
    console.log(req.query);

    res.send(User.getUsers());

});

router.post('/register', (req, res) => {
    
});

module.exports = router;