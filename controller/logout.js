
const express = require("express");
const router = express.Router();
const session = require("express-session");
const online = require("./online.js")

router.use(session(
    {
        secret: 'mysecretkey',
        resave: false,
        saveUninitialized: false,

    }
))

var logout = {
    get: (req, res) => {
        delete online[online.indexOf(req.session.user)];
        req.session.destroy();
        res.redirect("/");
    },
}

module.exports = logout;