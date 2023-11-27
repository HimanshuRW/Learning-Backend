const fs = require("fs");
const path = require('path');
const productJson = path.join(__dirname, "/data/products.json");

module.exports = class Product {
    constructor({title,description,imgURL,price}) {
        this.title = title;
        this.description =description;
        this.imgUrl =imgURL;
        this.price =price;
    }
    save() {
        let products = [];
        this.id = Math.round(Math.random()*1000);
        fs.readFile(productJson, (err, data) => {
            if (!err) {
                products = JSON.parse(data);
                products.push(this);
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
    static findById(id, callback){
        fs.readFile(productJson, (err, data) => {
            if (err) {
                callback([]);
            }
            const productArray = JSON.parse(data);
            let product;
            for (product of productArray){
                if (product.id==id) {
                    callback(product);
                }
            }
        })
    }
    static findIndexByID(id, callback){
        fs.readFile(productJson, (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const productArray = JSON.parse(data);
                let product;
                productArray.forEach((product,index) => {
                    if (product.id==id) {
                        callback(index);
                    }
                });
            }
        })
    }
    static deleteById(id,callback){
        this.findIndexByID(id,index=>{
            fs.readFile(productJson, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    const productArray = JSON.parse(data);
                    productArray.splice(index, 1);
                    fs.writeFile(productJson,JSON.stringify(productArray),callback);
                }
            })
        })
    }
    static updateById(id,obj,callback){
        this.findIndexByID(id,index=>{
            fs.readFile(productJson, (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    const productArray = JSON.parse(data);
                    productArray[index]= obj;
                    fs.writeFile(productJson,JSON.stringify(productArray),callback)
                }
            })
        })
    }
}