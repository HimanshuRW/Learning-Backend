const express = require("express");
const http = require("http");

const app = express();
function middleWare1(req,res,next){
    console.log("----------");
    console.log("in the middleware 1");
    next();
}
function middleWare2(req,res,next){
    console.log("in the middleware 2");
    res.send("<h1>Hello from the express !!</h1>")
}
app.use("/",middleWare1,middleWare2);

const server = http.createServer(app);
app.listen(3000);