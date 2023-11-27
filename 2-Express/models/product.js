const { json } = require("body-parser");
const fs = require("fs");
const path = require('path');
const productJson = path.join(__dirname, "data/products.json");

module.exports = class Product {
    constructor(t) {
        this.title = t;
    }
    save() {
        let products = [];
        fs.readFile(productJson, (err, data) => {
            if (!err) {
                products = JSON.parse(data);
                products.push(this.title);
                fs.writeFile(productJson, JSON.stringify(products), (e) => {
                    console.log(e);
                });
            } else {
                console.log(err);
            }
        });
    }
    static fetchAll(callback) {
        fs.readFile(productJson, (err, data) => {
            if (err) {
                callback([]);
            }
            callback(JSON.parse(data));
        })
    }

}