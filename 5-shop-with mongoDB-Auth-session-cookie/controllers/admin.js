const Product = require("../models/product");
const Cart = require('../models/cart');
const path = require('path');


exports.postAddProducts = (req,res)=>{
    req.body.price = parseInt(req.body.price)
    let newProduct = new Product(req.body);
    newProduct.save(()=>{
        res.redirect("/");
    });
}
exports.getAddProducts = (req,res)=>{
    res.render("admin/add-product", {
        docTitle: "Add Product",
        path : "/admin/add-product"
    });
}
exports.getProducts = (req, res) => {
    Product.fetchAll(productList=>{
        res.render("admin/products", {
            productList: productList,
            docTitle: "Shop",
            path : "/admin/products"
        });
    })
}
exports.postEditProducts = (req, res) => {
    console.log(req.body);
    Product.UpdateOne(req.body.id,req.body,()=>{
        res.redirect("/");
    });
}
exports.getDeleteProduct = (req, res) => {
    // Cart.deleteById(req.params.productID,()=>{
    //     Product.deleteById(req.params.productID,()=>{
    //         res.redirect("/");
    //     });
    // });
    Product.deleteById(req.params.productID,()=>{
        res.redirect("/");
    })
}
exports.getEditProducts = (req, res) => {
    const productID = req.params.productID; 
    Product.findById(productID, product=>{
        res.render("admin/edit-product", {
            product: product,
            docTitle: "Edit Product",
            path : "/admin/products"
        });
    })
}