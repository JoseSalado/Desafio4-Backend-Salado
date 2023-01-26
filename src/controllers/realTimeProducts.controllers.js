const { Router } = require("express");
const ProductManager = require("../managers/productManager");

const path = "./src/db/products/products.json";
const router = Router();
const productManager = new ProductManager(path);

const LIMIT = 20;
router.get("/", async (req, res) => {
  try {
    const { from = 1, limit = LIMIT } = req.query;
    const products = await productManager.getProducts();
    res.render('realTimeProducts');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;