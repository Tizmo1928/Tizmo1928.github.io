const express = require("express");
const socket = require("socket.io")
const app = express();


const PORT = process.env.PORT || 3000;
const server = app.listen(PORT,()=>{
    console.log(`server connected to ${PORT}`);
    
});
app.use(express.static("public"));
//socket setup
var io = socket(server);

io.on("connection",(socket)=>{
    console.log("connected to socket",socket.id);
    socket.on("chat",(data)=>{
        io.sockets.emit("chat",data);
    })
    socket.on("typing",(data)=>{
        socket.broadcast.emit("typing",data)
    })
});