const express = require("express");
const productController = require("../controllers/products");
const router = express.Router();

router.post("/add-product",productController.postAddProducts);
router.get("/add-product",productController.getAddProducts);

module.exports = router;