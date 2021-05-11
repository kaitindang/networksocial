const url = require("../models/db_config.js")
const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const mongodb = require("mongodb");
const session = require("express-session");
const online = require("./online.js")

router.use(session(
    {
        secret: 'mysecretkey',
        resave: false,
        saveUninitialized: false,

    }
))

const MongoClient = mongodb.MongoClient;
var login = {
    get: function (req, res) {
        res.render("login.ejs")
    },
    post: (req, res) => {
        MongoClient.connect(url, (err, db) => {
            if (err) { console.log(err) };
            // check user in database
            let dbo = db.db("networksocial");
            dbo.collection("users").find({ name: req.body.username }).toArray((err, user) => {
                if (err) { console.log(err) };
                // not have user
                if (!user[0]) {
                    console.log(req.body.username + "is not found")
                    res.render('re-login.ejs');
                }
                // check pass
                else {

                    //var bool = bcrypt.compareSync(req.body.password, user[0].password);
                    //not user
                    if (req.body.password != user[0].password) {
                        res.render('re-login.ejs');
                    } 
                    //have user
                    else {
                        //set session
                        req.session.fullname = user[0].fullname;
                        req.session.user = req.body.username;
                        req.session.isLoggedIn = true;
                        if (online.includes(req.session.user) == false) {
                            online.push(req.session.user);
                        }
                        console.log("List online: " + online);
                        console.log("Login successfully");
                        res.redirect(`/newfeed`);
                    }
                }
            })
        });
    },
}
module.exports = login;