const express = require("express");
const router = express.Router();
const multer = require("multer");
const session = require("express-session");
//route
const login = require("../controller/login.js");
const logout = require("../controller/logout.js");
const signup = require("../controller/signup.js");
const newfeed = require("../controller/newfeed.js");
const posts = require("../controller/posts.js");
const profile = require("../controller/profile.js");
const editprofile = require("../controller/editprofile.js");
const createpost = require("../controller/createpost.js");
const deletepost = require("../controller/deletepost.js");
const listnotification = require("../controller/listnotification.js");

//PATH
const path = "C:/Users/Admin/Desktop/WebNangCao/WebAD"; //edit path if the upload is fault

//SET UPLOAD
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path + '/public/image');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
var storage_avatar = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path + '/public/image/avatar');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
var upload = multer({ storage: storage })
var upload_avatar = multer({ storage: storage_avatar })

//SET SESSION
router.use(session(
    {
        secret: 'mysecretkey',
        resave: false,
        saveUninitialized: false,

    }
))

//GET
router.get("/", login.get);
router.get("/signup", signup.get);
router.get("/newfeed", newfeed.get);
router.get("/listnotification", listnotification.get);
router.get("/post/:id", posts.get);
router.get("/profile/:username", profile.get);
router.get("/editprofile", editprofile.get);
router.get("/deletepost/:id", deletepost.get);
router.get("/logout", logout.get);

//POST
router.post("/login", login.post);
router.post('/signup', signup.post);
router.post("/createpost", upload.single("file_image"), createpost.post);
router.post("/editprofile", upload_avatar.single("avatar"), editprofile.post);

module.exports = router