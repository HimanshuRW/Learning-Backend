const Product = require("../models/product");
const Cart = require('../models/cart');
const path = require('path');
const product = require("../models/product");


exports.postAddProducts = (req,res)=>{
    req.body.price = parseInt(req.body.price);
    if(!req.file){
        return res.status(422).render("admin/add-product", {
            docTitle: "Add Product",
            path : "/admin/add-product"
        });
    }
    req.body.imgUrl = "/"+req.file.path;
    console.log(req.body);
    let newProduct = new Product(req.body);
    newProduct.save()
        .then((result)=>{
            console.log(result);
            res.redirect("/");
        })
        .catch(err=>{
            console.log(err);
        });
}
exports.getAddProducts = (req,res)=>{
    res.render("admin/add-product", {
        docTitle: "Add Product",
        path : "/admin/add-product"
    });
}
exports.getProducts = (req, res) => {
    Product.find()
        .then(productList=>{
            res.render("admin/products", {
                productList: productList,
                docTitle: "Shop",
                path : "/admin/products"
            });
        }).catch(err=>console.log(err));
}
exports.postEditProducts = (req, res) => {
    Product.findById(req.body.id)
        .then(product=>{
            product.title = req.body.title;
            product.price = req.body.price;
            product.description = req.body.description;
            if(req.file){
                product.imgUrl = "/"+req.file.path;
            }
            return product.save();
        })
        .then(()=>{
            res.redirect('/admin/products');
        })
        .catch(err=>console.log(err));
}
exports.getDeleteProduct = (req, res) => {
    // Cart.deleteById(req.params.productID,()=>{
    //     Product.deleteById(req.params.productID,()=>{
    //         res.redirect("/");
    //     });
    // });
    Product.findByIdAndRemove(req.params.productID)
        .then(()=>{
            req.user.removeFromCart(req.params.productID)
            res.redirect("/");
        }).catch(err=>console.log(err));
}
exports.getEditProducts = (req, res) => {
    const productID = req.params.productID; 
    Product.findById(productID)
        .then(product=>{
            res.render("admin/edit-product", {
                product: product,
                docTitle: "Edit Product",
                path : "/admin/products"
            });
        }).catch(err=>console.log(err));
}