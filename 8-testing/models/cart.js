const fs = require("fs");
const path = require('path');
const cartJson = path.join(__dirname, "/data/cart.json");
const Product = require('./product');

module.exports = class Cart {
    constructor(id) {
        this.id = id;
        this.quanity = 1;
    }

    save(callback) {
        let cart;
        fs.readFile(cartJson, (err, data) => {
            if (!err) {
                cart = JSON.parse(data);
                let alreadyPresentInCart = false;
                cart.products.forEach(cartProduct => {
                    if (cartProduct.id==this.id) {
                        cartProduct.quanity++;
                        alreadyPresentInCart = true;
                    }
                });
                if (!alreadyPresentInCart) {
                    cart.products.push(this);
                }
                Product.findById(this.id, product => {
                    cart.totalAmt += product.price;
                    fs.writeFile(cartJson, JSON.stringify(cart), () => {
                        callback();
                    });
                })
            } else {
                console.log(err);
            }
        });
    }
    static decrease(id,callback){
        fs.readFile(cartJson,(err,data)=>{
            if (err) {
                console.log(err);
            } else {
                let cart = JSON.parse(data);
                for(let product of cart.products){
                    if (product.id==id) {
                        if (product.quanity==1) {
                            this.deleteById(id,callback);
                        } else {
                            product.quanity--;
                            Product.findById(id, product => {
                                cart.totalAmt += product.price;
                                fs.writeFile(cartJson, JSON.stringify(cart), () => {
                                    callback();
                                });
                            })
                        }
                    }
                }
            }
        })
    }
    static getIndexById(id,callmeback){
        fs.readFile(cartJson,(err,data)=>{
            if (err) {
                console.log(err);
            } else {
                let found = false;
                let cart = JSON.parse(data);
                cart.products.forEach((product,index) => {
                    if (product.id==id) {
                        found = true;
                        callmeback(found,cart,index);
                    }
                });
                if (!found) {
                    callmeback(found);
                }
            }
        })
    }
    static deleteById(id,callback){
        this.getIndexById(id,(found,cart,index)=>{
            if (found) {
                cart.products.splice(index, 1);
                Product.findById(id, product => {
                    cart.totalAmt -= product.price;
                    fs.writeFile(cartJson, JSON.stringify(cart), callback);
                })
            } else {
                callback();
            }
        })
    }
    static getCartArr(callback){
        // pass myArr and totalAmt to callback 
        // let myArr = [];
        fs.readFile(cartJson,(err,data)=>{
            if (err) {
                console.log(err);
            } else {
                let cart = JSON.parse(data);
                Product.fetchAll(data => {
                    // console.log(data);
                    let myArr = cart.products.map((cartProduct)=>{
                        for(let myProduct of data){
                            if (myProduct.id==cartProduct.id) {
                                return {
                                    title: myProduct.title,
                                    description: myProduct.description,
                                    imgUrl: myProduct.imgUrl,
                                    price: myProduct.price,
                                    id: myProduct.id,
                                    quantity : cartProduct.quanity
                                  };
                            }
                        }
                    });
                    callback(myArr,cart.totalAmt);
                })

            }
        })
    }
}

// cart = {
//     products : [
//         {
//             id : ---
//             qnty: ---
//         },
//         {
//             id : ---
//             qnty: ---
//         },
//         {
//             id : ---
//             qnty: ---
//         }
//     ],
//     totalAmt : ---
// }