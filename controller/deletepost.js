const url = require("../models/db_config.js")
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
var deletepost = {
    get: (req, res) => {
        if (req.session.isLoggedIn == true) {

            MongoClient.connect(url, (err, db) => {
                if (err) console.log(err);
                var id = req.params.id;
                let dbo = db.db("networksocial");
                dbo.collection("posts").deleteOne({ _id: mongodb.ObjectId(id) }, (err, result) => {
                    
                    if (err) throw err;
                    console.log("Deleted successfully");
                }) 
                res.redirect(`/newfeed`);
            }); 
        } 

    },
}

module.exports = deletepost;