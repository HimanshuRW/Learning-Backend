const express = require("express");
const app = express();

const server = app.listen(8000,()=>{
    console.log("listening to port 8000...");
})

const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  console.log("started....");
  
  io.on("connection", socket => {
      console.log("someone joined.....with id : "+socket.id);

    //   --- sending the event "myEvent" to client with argument as "msg is hello"
      socket.emit("myEvent","msg is hello")

      // receiving argument on a certain event from client
      socket.on("run",(msg)=>{
        console.log(msg);
      })



    // --- main code ----
    socket.on("NewMsg",msg=>{
        socket.broadcast.emit("addNewMsg",msg);
        socket.emit("addNewMsg",msg);
    })
  });