const mongoose = require("mongoose");
// const MONGO_DB_URI = 'mongodb+srv://himanshuMongo:himpass@myfirstcluster.urmejyo.mongodb.net/shop?retryWrites=true&w=majority';
const MONGO_DB_URI = 'mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';
const mongoConnect = (callback)=>{
    console.log("req sent");
    mongoose.connect(MONGO_DB_URI)
        .then(client=>{
            console.log("connected to Mongo DB Sucessfully....");
            // _db = client.db();
            callback();
        })
        .catch(err=>{
            console.log(err);
        })
}
// const getDb = ()=>{
//     if (_db) {
//         return _db;
//     } else {
//         throw 'No Database found !!!';
//     }
// }
module.exports = mongoConnect;