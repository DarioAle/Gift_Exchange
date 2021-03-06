"use strict";

const db = require('./mongodb-connect');
const chalk = require('chalk');

// ------- Projecting only a few colums from 
const postProjectionMask = {
    _id: 0,
    id: 1,
    nombrePost: 1,
    descripcionPost: 1,
    isNewGift: 1,
    date: 1,
    owner: 1,
    category: 1,
    quantity: 1,
    postIsActive: 1,
    interesados: 1,
    comments: 1,
    aqcuired: 1,
    image: 1,
    aquiredBy: 1,
    finalized: 1
};

const postSchema = db.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    nombrePost: {
        type: String,
        required: true
    },
    descripcionPost: {
        type: String,
        required: true,
    },
    isNewGift: {
        type: Boolean,
        required: true,
    },
    date: {
        type: Date,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ['ropa', 'electronicos', 'hogar', 'automoviles', 'accesorios', 'juguetes']
    },
    quantity: {
        type: Number,
        required: true
    },
    postIsActive: {
        type: Boolean,
        required: true
    },
    interesados: {
        type: [Object],
    },
    comments: {
        type: [String]
    },
    image: {
        type: [String],
        rquired : true
    },
    aquiredBy: {
        type: String
    },
    finalized: {
        type: Boolean,
        required: true
    },
});

// --------- Find with exact matching name and return only the first instance that matchec---------------------
postSchema.statics.findOneByPostName = function (postname) {
    return new Promise(function (resolve, reject) {
        db.model('Post').find({ 'nombrePost': new RegExp(".*" + postname + ".*") }, postProjectionMask, function (err, post) {
            if (err || post == undefined) {
                reject(err);
                return;
            }
            resolve(post);
        });
    });
}

// ---- Finalize a post ----
postSchema.statics.finalize = function(postId){
    return new Promise((resolve, reject) => {
        db.model('Post').findOne({ 'id': postId }, (err, doc) => {
            doc.finalized = true;
            doc.save((err, data) => {
                if(err){
                    reject(err);
                    return;         
                }
                resolve(doc.owner);
            })
        });
    })
}

// ---------------------- Register a new entry of a post -------------------------
postSchema.statics.registerPost = function(post) {
    return new Promise((resolve, reject) => {
        post.finalized = false;
        let newPost = new Post(post);
        newPost.save((err, product) => {
            if(err || product == undefined) {
                reject(err);
                return;
            }
            console.log(chalk.green.bold("Post succesfully added to the database"));
            resolve(product);
        });
    });
}

// ------------------- Regresar los regalos realcionados a una conversación
postSchema.statics.getConversations = function (usuario) {
    return new Promise((resolve, reject) => {
        db.model('Post').find({
            $and: [
                { 'postIsActive': false },
                { 'finalized': false },
                {
                    $or: [
                        { 'aquiredBy': usuario },
                        { 'owner': usuario }
                    ]
                }
            ]
        }, postProjectionMask, (err, docs) => {
            if (err || docs == undefined) {
                console.log(chalk.red("Looking for all posts in the database went wrong"));
                reject(err);
                return;
            }
            resolve(docs);
        })
    });
}

// --- Get the posts posted by a user
postSchema.statics.findAllByPoster = function name(usuario) {
    return new Promise(function (resolve, reject) {
        db.model('Post').find({ 'owner': usuario }, postProjectionMask, function (err, docs) {
            if (err || docs == undefined) {
                reject(err);
                return;
            }
            resolve(docs);
        });
    });
}

// --- Sets the winner ----
postSchema.statics.setWinner = function (postId, owner, winner) {
    return new Promise((resolve, reject) => {
        db.model('Post').findOne({ 'id': postId, 'owner': owner }, (err, doc) => {
            if (err || doc == undefined) {
                reject(err);
                return;
            }
            doc.aquiredBy = winner;
            doc.postIsActive = false;
            doc.save((err, product) => {
                if (err || product == undefined) {
                    reject(err);
                    return;
                }
                resolve(product);
            });
        });
    });
}

// Gees a post by post id
postSchema.statics.findOneByPostId = function (postId) {
    return new Promise((resolve, reject) => {
        db.model('Post').findOne({ 'id': postId }, postProjectionMask, (err, doc) => {
            if (err || doc == undefined) {
                reject(err);
                return;
            }
            resolve(doc);
        });
    });
}

// Gets adquierdBy username
postSchema.statics.getAdquiredByUser = function (usuario, categoria, nombre) {
    return new Promise((resolve, reject) => {
        db.model('Post').find({ 'aquiredBy': usuario, 'category': categoria, 'nombrePost': nombre }, postProjectionMask, (err, docs) => {
            if (err || docs == undefined) {
                reject(err);
                return;
            }
            resolve(docs);
        });
    });
}

// Return all post regardless of the data that is needed.
postSchema.statics.getAllPosts = function () {
    return new Promise(function (resolve, reject) {
        db.model('Post').find({}, postProjectionMask, (err, docs) => {
            if (err || docs == undefined) {
                console.log(chalk.red("Looking for all posts in the database went wrong"));
                reject(err);
                return;
            }
            resolve(docs);
        });
    });
}

// Return an specific post identified by it's unique id
postSchema.statics.findOnePostById = function (idPost) {
    return new Promise(function (resolve, reject) {
        db.model('Post').findOne({'id' : idPost}, postProjectionMask, (err,doc) =>{
            if(err || doc == undefined) {
                reject(err);
                return;
            }
            resolve(doc);
        });
    });
}

// Update when someone adds to have a reason
postSchema.statics.updateComments = function (idPost) {
    return new Promise(function (resolve, reject) {
        db.model('Post').findOne({'id' : idPost}, (err,doc) => {
            if(err || doc == undefined) {
                reject(err);
                return;
            }
            resolve(doc);
        })
    })
}

postSchema.statics.deleteOneById = function(postId) {
    return new Promise((resolve, reject) => {
        db.model('Post').findOne({'id': postId}).remove().exec((err, res) => {
            if(err){
                console.error(err);
                reject(err);
                return
            }
            resolve(res)
        })
    });
}

const Post = db.model('Post', postSchema);

module.exports = Post;