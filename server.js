const url = require('./models/db_config.js');
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const mongodb = require("mongodb");
const routes = require('./routes/routers');

//Set view
app.use("/public", express.static(__dirname + "/public"));
app.set('view-engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use("/", routes);

//Connect mongodb
const MongoClient = mongodb.MongoClient;

app.use(function (req, res, next) {
    res.removeHeader("X-Powered-By");
    next();
});

// real time comment
io.on("connection", (socket) => {
    socket.on("new_user", data => {
        socket.join(`${data}`)

        socket.on("clientSend", (data) => {
            MongoClient.connect(url, (err, db) => {
                let dbo = db.db("networksocial");

                dbo.collection("users").findOne({ name: data.commentUser }, (err, user) => {
                    if (err) console.log(err);
                    dbo.collection("posts").findOne({_id: mongodb.ObjectId(data.idpost)},(err,postc)=>{
                        dbo.collection("posts").updateOne({ _id: mongodb.ObjectId(data.idpost) }, {
                                           $push: {
                                               comment:{
                                                    commentUser: data.commentUser,
                                                    commentUsername: data.commentUsername,
                                                     avatarComment: user.avatar,
                                                     comment: data.message
                                               }
                                           }                                        
                        });
                        io.sockets.in(`${data.idpost}`).emit("serverSend", {
                            commentUser: data.commentUser,
                            commentUsername: data.commentUsername,
                            avatarComment: user.avatar,
                            comment: data.message,
                            commentcount: postc.comment.length+1
                        });
                    });          
                });
            });
        });
    });
})

//real time like
io.on("connection",(socket)=>{
    
    socket.on("like_post",(data)=>{
        socket.join(`${data.id}-like`);
        //console.log(data.id);
        MongoClient.connect(url,(err,db)=>{
            let dbo=db.db("networksocial");
            dbo.collection("posts").findOne({_id: mongodb.ObjectId(data.id)},(err,postl)=>{
                if(postl.like.includes(data.userSession)==false){
                    dbo.collection("posts").updateOne({_id: mongodb.ObjectId(data.id)}, {
                        $push: {
                            like: `${data.userSession}`
                        }
                    });
                    dbo.collection("posts").findOne({_id: mongodb.ObjectId(data.id)},(err,result)=>{
                        io.sockets.emit(`server_send_likecount_${data.id}`,{
                            likecount:result.like.length,
                       });
                       socket.leave(`${data.id}-like`);
                    });
                }
            });         
        });     
    });
})

var PORT = process.env.PORT || 3000;

//RUN
server.listen(PORT, function () {
    console.log("http://localhost:3000");
});