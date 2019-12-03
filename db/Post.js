"use strict";

const db = require('./mongodb-connect');
const chalk = require('chalk');

// ------- Projecting only a few colums from 
const postProjectionMask = {
    _id: 0,
    nombrePost: 1,
    descripcionPost: 1,
    isNewGift: 1,
    date: 1,
    owner: 1,
    category : 1,
    quantity : 1,
    postIsActive : 1,
    interesados : 1,
    comments : 1,
    aqcuired : 1,
    aquiredBy : 1
};

const postSchema = db.Schema({
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
        required: true
    },
    quantity : {
        type: Number,
        required : true
    },
    postIsActive : {
        type : Boolean,
        required : true
    },
    interesados : {
        type : [String],
    },
    comments : {
        type : [String]
    },
    aquiredBy : {
        type : String
    }
});

// --------- Find with exact matching name and return only the first instance that matchec---------------------
postSchema.statics.findOneByPostName = function (postname) {
    return new Promise(function (resolve, reject) {
        db.model('Post').find({ 'nombrePost' : new RegExp(".*" + postname + ".*")}, postProjectionMask, function (err, post) {
            if (err || post == undefined) {
                reject(err);
                return;
            }
            resolve(post);
        });
    });
}


postSchema.statics.registerPost = function(post) {
    return new Promise((resolve, reject) => {
        let newPost = new Post(post);
        newPost.save((err, product) => {
            if(err) {
                reject(err);
                return;
            }
            resolve(product);
        });
    });
}

// ------------------- Regresar los regalos que tienen un acquired user para un usuario dado

// Return all post regardless of the data that is needed.
postSchema.statics.getAllPosts = function() {
    return new Promise(function (resolve, reject)  {
        db.model('Post').find({}, postProjectionMask, (err, docs) =>{
            if(err || docs == undefined) {
                console.log(chalk.red("Looking for all posts in the database went wrong"));
                reject(err);
                return;
            }
            resolve(docs);
        });
    });
}

const Post = db.model('Post', postSchema);

module.exports = Post;