// const path = require("path");
const Product = require("../models/product");
const Cart = require("../models/cart");
const User = require("../models/users");
const path = require("path");
const fs = require('fs');
const PDFDocument = require("pdfkit");
const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const ITEMS_PER_PAGE = 2;

module.exports.getIndex = (req, res) => {
    Product.find()
        .then(productList => {
            res.render("shop/index", {
                productList: productList,
                docTitle: "Shop",
                path: "/",
                isLoggedIn: req.session.isLoggedIn
            });
        }).catch(err => console.log(err));
}
module.exports.getProducts = (req, res) => {

    // ---- with pagination ------
    let page = parseInt(req.query.page);
    if (isNaN(page)) page =1;
    let totalProducts;
    Product.find()
        .count()
        // this then block is for count()
        .then(numProducts => {
            totalProducts = numProducts;

            // this itself return a promise 
            return Product.find()
                .skip((page - 1) * ITEMS_PER_PAGE)
                .limit(ITEMS_PER_PAGE)
        })
        // this then is for the returned promise
        .then(productList => {
            res.render("shop/product-list", {
                productList: productList,
                docTitle: "Products",
                path: "/products",
                isLoggedIn: req.session.isLoggedIn,
                totalProducts:totalProducts,
                currentPage : page,
                hasNextPage : ITEMS_PER_PAGE*page<totalProducts,
                hasPreviousPage : page>1,
                nextPage : page+1,
                previousPage : page-1,
                lastPage : Math.ceil(totalProducts/ITEMS_PER_PAGE)
            });
        }).catch(err => console.log(err));

}
module.exports.getProduct = (req, res) => {
    const productID = req.params.productID;
    Product.findById(productID)
        .then(product => {
            res.render("shop/product-detail", {
                product: product,
                docTitle: product.title,
                path: "/products",
                isLoggedIn: req.session.isLoggedIn
            });
        }).catch(err => console.log(err));
}


// -------------------------------------------------------------
module.exports.getCart = (req, res) => {
    let totalAmt;
    let products_to_checout;
    if (req.user.cart.items[0]) {
        req.user
            .populate({
                path: 'cart.items',
                populate: {
                    path: 'productId',
                    model: 'Product'
                }
            })
            .then(user => {
                totalAmt = user.cart.items.reduce((total, item) => {
                    return total + (item.productId.price * item.quantity);
                }, 0);

                // --- adding stripe session ---
                return stripe.checkout.sessions.create({
                    payment_method_types : ["card"],
                    line_items: user.cart.items.map(cart_product=>{
                        return {
                            price_data: {
                              currency: 'inr',
                              unit_amount: cart_product.productId.price*100,
                              product_data: {
                                name: cart_product.productId.title,
                                description: cart_product.productId.description
                              }
                            },
                            quantity: cart_product.quantity,
                          }
                    }),
                    mode: 'payment',
                    success_url : `${req.protocol}://${req.get('host')}/checkout/success` ,
                    cancel_url : `${req.protocol}://${req.get('host')}/checkout/cancel`
                });
            })
            .then(session =>{
                console.log("stripe session id is "+session.id);
                res.render("shop/cart", {
                    productList: req.user.cart.items,
                    docTitle: "Your Cart",
                    path: "/cart",
                    totalAmt: totalAmt,
                    stripe_session_id : session.id,
                    publishable_key: process.env.STRIPE_PUBLISHABLE_KEY
                })
            })
            .catch(err => console.log(err));
    } else {
        res.render("shop/cart", {
            productList: [],
            docTitle: "Your Cart",
            path: "/cart",
            totalAmt: 0,
            stripe_session_id : "kuch Nahi",
            publishable_key: process.env.STRIPE_PUBLISHABLE_KEY
        })
    }
}
module.exports.getCheckoutSuccess = (req, res) => {
    res.render("shop/checkoutSuccess", {
        // productList: productList,
        docTitle: "Success",
        path: "/checkout",
        isLoggedIn: req.session.isLoggedIn
    });
}
module.exports.getAddToCart = (req, res) => {
    console.log("---------- inside the get add to cart -------");
    console.log(req.params);
    req.user.addToCart(req.params.productID)
        .then(() => {
            res.redirect("back");
        })
        .catch(err => console.log(err));
}
module.exports.getDecreaseInCart = (req, res) => {
    req.user.decreaseToCart(req.params.productID)
        .then(() => {
            res.redirect("back");
        })
        .catch(err => console.log(err));
}
module.exports.getCheckout = (req, res) => {
    res.render("shop/checkout", {
        productList: productList,
        docTitle: "Checkout",
        path: "/checkout"
    });
}
module.exports.getOrders = (req, res) => {
    const userId = req.user._id;
    // const invoiceName = "invoice-" + userId + ".pdf";
    const invoiceName = "invoice-64ef53cc27e1fbbcef1993d8.pdf";
    const invoicePath = path.join('data', 'invoices', invoiceName);
    // const file = fs.createReadStream(invoicePath);
    // file.pipe(res);


    const pdfdoc = new PDFDocument();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=' + invoiceName);
    pdfdoc.pipe(fs.createWriteStream(invoicePath));
    pdfdoc.pipe(res);
    pdfdoc.text("Hello Himanshu");
    pdfdoc.end();
}


// ----- plya / pratice ----
exports.deleteAsyncReq = (req,res,next)=>{
    console.log("---- we in delete async req controller ----");
    let prodId = req.params.prodID;
    res.status(200).json({message:"we received "+prodId});
}
exports.getAsyncReq = (req,res,next)=>{
    res.render("play/AsyncReq");
    // res.json(req);
}