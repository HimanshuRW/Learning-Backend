const express = require("express");
const adminController = require("../controllers/admin");
const router = express.Router();

router.post("/add-product",adminController.postAddProducts);
router.get("/add-product",adminController.getAddProducts);
router.get("/edit-product/:productID",adminController.getEditProducts);
router.get("/delete-product/:productID",adminController.getDeleteProduct);
router.post("/edit-product",adminController.postEditProducts);
router.get("/products",adminController.getProducts);

module.exports = router;