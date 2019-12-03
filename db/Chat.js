"use strict";

const db = require('./mongodb-connect');
const Gift = require('./Gift');

const schema = {
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
    gift: {
        type: Number,
        required: true
    },
    message: {
        type: String,
        required: true
    }
};

schema.statics.getAllMessages = function (user) {
    return new Promise((resolve, reject) => {
        // TODO: Get gifts with state an related to 'user', then get the first of each gift to render
    });
}

schema.statics.getConversations = function (gift) {
    return new Promise((resolve, reject) => {
        Chat.find({'gift': gift}, (err, documents) => {
            if(err){
                reject(err)
                return;
            }
            resolve(documents);
        });
    });
}

schema.statics.createMessage = function (timestamp, reciever, sender, message, gift) {
    return new Promise((resolve, reject) => {
        let entry = new Chat({
            id: timestamp,
            reciever,
            sender,
            gift, 
            message
        });
        let doc = entry.save((err, product) => {
            if(err) {
                reject(err);
                return;
            }

            resolve(product);
        });
    });
}

const Chat = db.model('Chat', schema);