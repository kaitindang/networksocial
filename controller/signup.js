const url = require('../models/db_config.js')
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const mongodb = require("mongodb");
const session = require("express-session");
const User = require("../models/users.js");

router.use(session(
    {
        secret: 'mysecretkey',
        resave: false,
        saveUninitialized: false,

    }
))

const MongoClient = mongodb.MongoClient;
var signup = {
    get: function (req, res) {
        res.render("signup.ejs")
    },
    post: (req, res) => {
        MongoClient.connect(url, (err, db) => {
            if (err) { console.log(err) };
            // encryption password
            let hashedPassword = bcrypt.hash(req.body.password, 10).then(function (hashedPassword) {
                let temp = {
                    name: req.body.username,
                    fullname: req.body.fullname,
                    faculty: req.body.faculty,
                    password: req.body.password,
                    authorization: req.body.authorization
                }
                let user = new User(temp);

                let dbo = db.db("networksocial");
                dbo.collection("users").find({ name: req.body.username }).toArray((err, result) => {
                    if (err) { console.log(err) };

                    if (result[0]) {
                        console.log(result)
                        console.log("Username registered");
                        res.render('signup.ejs');
                    } else {

                        dbo.collection("users").insertOne(user, (err, res) => {
                            if (err) throw err;
                            console.log("A user inserted");                           
                        }); 
                        res.render('signup-success.ejs');
                    }
                }); 
            }) 
        })
    },
}

module.exports = signup;