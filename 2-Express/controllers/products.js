const path = require("path");
const Product = require("../models/product");
const items = [];

exports.postAddProducts = (req,res)=>{
    console.log(req.body.productName);
    let newProduct = new Product(req.body.productName);
    newProduct.save();
    res.redirect("/");
}
exports.getAddProducts = (req,res)=>{
    res.sendFile(path.join(__dirname,"../views/add-product.html"))
}
exports.getProducts = (req, res) => {
    // res.sendFile(path.join(__dirname,"../views/shop.html"))

    // --- hbs ---
    // res.render("shop",{
    //     productList : adminPage.items,
    //     docTitle : "Shop",
    //     layout : 'mainlayout',
    //     productIs : adminPage.items.length>0?true:false
    // });

    // --- ejs ---
    Product.fetchAll(productList=>{
        res.render("shop", {
            productList: productList,
            docTitle: "Shop"
        });
    })
}