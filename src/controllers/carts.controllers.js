const { Router } = require("express");
const { v4: uuid } = require("uuid");
const CartManager = require("../managers/cartManager");

const path = "./src/db/carts/carts.json";
const router = Router();
const cartManager = new CartManager(path);

router.get("/", async (req, res) => {
  try {
    const carts = await cartManager.getProducts();
    res.json({ carts });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    const cart = await cartManager.getProductById(cid);
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    await cartManager.addCart();
    res.json({ msg: "cart has been created" });
  } catch (error) {
    console.log(error);
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const prodInCart = await cartManager.addProduct(cid, pid)
    res.json({prodInCart})
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;