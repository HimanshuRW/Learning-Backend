// const path = require("path");
const Product = require("../models/product");
const Cart = require("../models/cart");
const cartList1 = [
    {
        "title": "Subtle Art ",
        "description": "Its a very nice book !",
        "imgUrl": "https://loremflickr.com/cache/resized/5077_5901083565_1de48b7ece_320_240_nofilter.jpg",
        "price": "99",
        "id": 1,
        quantity:2
    },
    {
        "title": "Warrior Cat",
        "description": "This can kill the rat",
        "imgUrl": "https://loremflickr.com/cache/resized/65535_52886923341_9db4d78a42_n_320_240_nofilter.jpg",
        "price": "999.99",
        "id": 888,
        quantity:3
    }
];
module.exports.getIndex = (req,res)=>{
    Product.fetchAll(productList=>{
        res.render("shop/index", {
            productList: productList,
            docTitle: "Shop",
            path : "/"
        });
    })
}
module.exports.getProducts = (req,res)=>{
    Product.fetchAll(productList=>{
        res.render("shop/product-list", {
            productList: productList,
            docTitle: "Products",
            path : "/products"
        });
    })
}
module.exports.getProduct = (req,res)=>{
    const productID = req.params.productID;
    Product.findById(productID,product=>{
        res.render("shop/product-detail", {
            product: product,
            docTitle: product.title,
            path : "/products"
        });
    })
}
module.exports.getCart = (req,res)=>{
    Cart.getCartArr((myArr,totalAmt)=>{
        res.render("shop/cart",{
            productList: myArr,
            docTitle: "Your Cart",
            path : "/cart",
            totalAmt:totalAmt
        })
    });
}
module.exports.getAddToCart = (req,res)=>{
    const newItem = new Cart(req.params.productID);
    newItem.save(()=>{
        res.redirect('back');
    });
}
module.exports.getDecreaseInCart = (req,res)=>{
    const productID = req.params.productID;
    Cart.decrease(productID,()=>{
        res.redirect('back');
    });
}
module.exports.getCheckout = (req,res)=>{
    res.render("shop/checkout", {
        productList: productList,
        docTitle: "Checkout",
        path : "/checkout"
    });
}
module.exports.getOrders = (req,res)=>{
    res.render("shop/orders", {
        productList: [],
        docTitle: "Your Orders",
        path : "/orders"
    });
}