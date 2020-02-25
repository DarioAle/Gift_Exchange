const Post = require('./db/Post');

Post.find({}, (err, docs) => {
    for(let i = 0; i < docs.length; i++){
        docs[i].finalized = false;
        docs[i].save((err3, data) => {
            console.log(i);
        });
    }
})