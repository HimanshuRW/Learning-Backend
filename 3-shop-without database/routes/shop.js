const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
// router.get("/products/delete/:productID", shopController.getProduct);
router.get("/products/:productID", shopController.getProduct);
router.get("/cart", shopController.getCart);
router.get("/addToCart/:productID", shopController.getAddToCart);
router.get("/decrease/:productID", shopController.getDecreaseInCart);
router.get("/checkout", shopController.getCheckout);
router.get("/orders", shopController.getOrders);

module.exports = router;