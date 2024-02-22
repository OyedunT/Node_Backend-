const express = require("express")
const productModel = require("../Models/productModel")
const { createProduct } = require("../Controllers/productController")

const router = express.Router()

router.post("/uploadProduct", createProduct)



router.get('/products', async (req, res) => {
    try {
        const products = await productModel.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
module.exports = router;