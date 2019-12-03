"use strict";

const db = require('./mongodb-connect');

const schema = db.Schema({
    timeId: {
        type: Number,
        required: true
    },
    reciever: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    post: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});

schema.statics.getAllMessages = function (user) {
    return new Promise((resolve, reject) => {
        // TODO: Get posts with state an related to 'user', then get the first of each post to render
    });
}

schema.statics.getConversations = function (post) {
    return new Promise((resolve, reject) => {
        Chat.find({'post': post}, (err, documents) => {
            if(err){
                reject(err)
                return;
            }
            resolve(documents);
        });
    });
}


schema.statics.createMessage = function (timestamp, reciever, sender, message, post) {
    return new Promise((resolve, reject) => {
        let entry = new Chat({
            timeId: timestamp,
            reciever,
            sender,
            post, 
            message
        });
        entry.save((err, product) => {
            if(err) {
                reject(err);
                return;
            }

            resolve(product);
        });
    });
}

const Chat = db.model('Chat', schema);

module.exports = Chat;