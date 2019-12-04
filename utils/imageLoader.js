"use strict";

const AWS = require('aws-sdk');
const config = require('./../shared');
const path = require('path');
const fs = require('fs');

process.env.aws_access_key_id  = config.aws.ACCESS_KEY;
process.env.aws_secret_access_key = config.aws.SECRET_KEY;
process.env.BUCKET_NAME = config.aws.bucketName;

AWS.config.accessKeyId = config.aws.ACCESS_KEY;
AWS.config.secretAccessKey = config.aws.SECRET_KEY;

let s3 = new AWS.S3(); 

function imageLoader(file, callback) {
    let filename = file.originalname;
    let s = (filename + "").split('.');
    // timestamp.ext
    filename =  new Date().getTime() + "." + s[s.length - 1];
    let options = {ACL: 'public-read', Bucket: config.aws.bucketName, Body: fs.createReadStream(file.path), Key: filename};
    console.log(file);
    s3.upload(options, (err, data) => {
        if(err){
            callback(err, null);
        } if(data) {
            fs.unlinkSync(file.path);
            callback(null, data.Location);
        }
    });
}

module.exports = imageLoader;