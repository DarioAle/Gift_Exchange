'use strict';

const express = require('express');
const cors = require('cors');
const helment = require('helmet');

const authController = require('./controllers/auth');
const userController = require('./controllers/user');
const postsController = require('./controllers/posts');
const chatController = require('./controllers/chat');

// const userRouter = require('/api/user')

let PORT = process.env.PORT || 3000;

let app = express();

app.use(cors());
app.use(helment());
app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.use('/api/auth', authController);
app.use('/api/user', userController);
app.use('/api/posts', postsController);
app.use('/api/chat', chatController);

app.listen(PORT, (e) => {
    console.info("App running at port " + PORT);
});
