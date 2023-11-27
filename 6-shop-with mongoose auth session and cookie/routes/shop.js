const express = require("express");
const router = express.Router();
const shopController = require("../controllers/shop");
const checkUser = require("../middlewares/checkUser");

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/products/:productID", shopController.getProduct);
router.get("/cart", checkUser,shopController.getCart);
router.get("/addToCart/:productID",checkUser, shopController.getAddToCart);
router.get("/decrease/:productID",checkUser, shopController.getDecreaseInCart);
// router.get("/checkout",checkUser, shopController.getCheckout);
router.get("/orders",checkUser, shopController.getOrders);
router.get("/checkout/success",checkUser, shopController.getCheckoutSuccess);
router.get("/checkout/cancel",checkUser, shopController.getCart);

// ---- play / pratice routes ----
// router.get("/aysncReq",checkUser, shopController.getAsyncReq);
router.get("/aysncReq", shopController.getAsyncReq);
// router.delete("/aysncReq/:prodID", shopController.deleteAsyncReq);
router.delete("/aysncReq/:prodID",checkUser, shopController.deleteAsyncReq);


module.exports = router;