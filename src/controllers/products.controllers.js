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
    res.json({ products: products.splice(from - 1, limit), from, limit });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productManager.getProductById(pid);
    res.json(product);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.body;
    const product = {
      title,
      description,
      code,
      price,    
      status,
      stock,
      category,
      thumbnails,
    };
    const savedProduct = await productManager.addProducts(product);
    res.json({ savedProduct });
  } catch (error) {
    console.log(error);
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const {
      title,
      description,
      code,
      price,
      status,
      stock,
      category,
      thumbnails,
    } = req.body;
    const product = {
      title,
      description,
      code, 
      price,
      status,
      stock,
      category,
      thumbnails,
    };
    const updatedProduct = await productManager.updateProduct(pid, product);
    res.json({updatedProduct});
  } catch (error) {
    res.json({ error: error });
  }
}); 

router.delete("/:pid", async (req, res) => {    
  try {
    const { pid } = req.params;
    const deletedProduct = await productManager.deleteProduct(pid)
    res.json({deletedProduct});
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;