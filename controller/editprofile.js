
const url = require("../models/db_config.js");
const express = require("express");
const router = express.Router();
const mongodb = require("mongodb");
const session = require("express-session");

router.use(session(
    {
        secret: 'mysecretkey',
        resave: false,
        saveUninitialized: false,

    }
))

const MongoClient = mongodb.MongoClient;
var editprofile = {
    get: (req, res) => {
        MongoClient.connect(url, (err, db) => {
            if (err) console.log(err);
            let dbo = db.db("networksocial");
            dbo.collection("users").findOne({ name: req.session.user }, (err, result) => {
                res.render("editprofile.ejs", {
                    user: result,
                    userSession: result
                })
            })
        });
    },
    post: (req, res) => {
         MongoClient.connect(url,async (err, db) => {
            let dbo = db.db("networksocial");
            if (req.file) {
                let querystring = {
                    $set: {
                        fullname: req.body.fullname,
                        idstudent: req.body.idstudent,
                        avatar: req.file.filename,
                        faculty: req.body.faculty,
                        password: req.body.password
                    }
                }
                dbo.collection("posts").updateMany({ username: req.session.user }, {
                    $set: {
                        fullname: req.body.fullname,
                        avatar: req.file.filename,
                    }
                });
                dbo.collection("posts").updateMany({ "comment.commentuser": req.session.user }, {
                    $set: {
                        "comment.$.avatarcomment": req.file.filename
                    }
                })
                dbo.collection("users").updateOne({ name: req.session.user }, querystring);
                
            } else {
                let querystring = {
                    $set: {
                        fullname: req.body.fullname,
                        idstudent: req.body.idstudent,
                        faculty: req.body.faculty,
                        password: req.body.password
                    }
                }
                dbo.collection("posts").updateMany({ username: req.session.user }, {
                    $set: {
                        fullname: req.body.fullname,
                    }
                });
                dbo.collection("users").updateOne({ name: req.session.user }, querystring);
            }
            await res.redirect('/editprofile');
        });
       
    },
}

module.exports = editprofile;