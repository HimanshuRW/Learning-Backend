const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());
const feedRoutes = require("./routes/feed");

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    //     // res.setHeader("Access-Control-Allow-Origin","codepen.io,himanshurw.co.in,http://localhost:3000");
        res.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE");
        res.setHeader("Access-Control-Allow-Headers","Content-Type,Authorization");
    next();
})
app.use("/feed",feedRoutes);

app.listen(8000,()=>{
    console.log("listening to 8000....");
});