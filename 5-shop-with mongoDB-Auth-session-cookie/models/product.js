const mongodb = require('mongodb');
const getDb = require("../util/database").getDb;

module.exports = class Product {
    constructor({ title, description, imgURL, price }) {
        this.title = title;
        this.description = description;
        this.imgUrl = imgURL;
        this.price = price;
    }
    save(callback) {
        const db = getDb();
        db.collection('products')
            .insertOne(this)
            .then(callback)
            .catch(err => {
                console.log(err);
            })
    }
    static fetchAll(callback) {
        const db = getDb();
        db.collection('products')
            .find()
            .toArray()
            .then(result => {
                // console.log(result);
                callback(result);
            }).catch(err => {
                console.log(err);
            })
    }
    static findById(id, callback) {
        const db = getDb();
        const o_id = new mongodb.ObjectId(id);
        db.collection('products')
            .findOne({"_id": o_id})
            .then(product => {
                callback(product);
            }).catch(err => {
                console.log(err);
            })
    }
    static UpdateOne(id,myProductObj,callback){
        const db = getDb();
        const o_id = new mongodb.ObjectId(id);
        db.collection('products')
            .updateOne({"_id": o_id},{$set : myProductObj})
            // .next()
            .then(product => {
                console.log(product);
                callback();
            }).catch(err => {
                console.log(err);
            })
    }
    static deleteById(productID,callback){
        const db = getDb();
        db.collection("products")
            .deleteOne({_id : new mongodb.ObjectId(productID)})
            .then(callback)
            .catch((err)=>{
                console.log("This is consoling the err in deleting the product : ",err);
            })
    }
}