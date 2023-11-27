const mongoose = require("mongoose");
const mongoConnect = (callback)=>{
    console.log("req sent");
    mongoose.connect(process.env.MONGO_DB_URI)
        .then(client=>{
            console.log("connected to Mongo DB Sucessfully....");
            callback();
        })
        .catch(err=>{
            console.log(err);
        })
}
module.exports = mongoConnect;