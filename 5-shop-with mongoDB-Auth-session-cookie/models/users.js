const mongodb = require('mongodb');
const getDb = require("../util/database").getDb;

module.exports = class Product {
    constructor({username, email}) {
        this.username = tusernametle;
        this.email = email;
    }
    save(callback) {
        const db = getDb();
        db.collection('users')
            .insertOne(this)
            .then(callback)
            .catch(err => {
                console.log(err);
            })
    }
    static findById(id, callback) {
        const db = getDb();
        const o_id = new mongodb.ObjectId(id);
        db.collection('users')
            .findOne({"_id": o_id})
            .then(product => {
                callback(product);
            }).catch(err => {
                console.log(err);
            })
    }
}