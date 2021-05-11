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
var profile = {
    get: (req, res) => {
        MongoClient.connect(url, (err, db) => {
            if (err) console.log(err);
            let dbo = db.db("networksocial");
            // check user
            dbo.collection("users").findOne({ name: req.params.username }, (err, userProfile) => {
                if (req.session.user == req.params.username) {
                    dbo.collection("posts").find({ username: req.params.username }).sort({ index: -1 }).toArray((err, posts) => {
                        res.render("profile.ejs", {
                            userProfile: userProfile,
                            userSession: userProfile,
                            posts: posts

                        }); 
                    }); 
                } else {
                    dbo.collection("users").findOne({ name: req.session.user }, (err, userSession) => {

                        dbo.collection("posts").find({ username: req.params.username }).sort({ index: -1 }).toArray((err, posts) => {
                            res.render("profile.ejs", {
                                userProfile: userProfile,
                                userSession: userSession,
                                posts: posts

                            })
                        }) ;
                    }) ;
                }
            })

        }) 
    },
}

module.exports = profile;