const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const uri = 'mongodb+srv://himanshuMongo:himpass@myfirstcluster.urmejyo.mongodb.net/shop?retryWrites=true&w=majority';
let _db;
const mongoConnect = (callback)=>{
    MongoClient.connect(uri)
        .then(client=>{
            console.log("connected to Mongo DB Sucessfully....");
            _db = client.db();
            callback();
        })
        .catch(err=>{
            console.log(err);
        })
}
const getDb = ()=>{
    if (_db) {
        return _db;
    } else {
        throw 'No Database found !!!';
    }
}
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;