const fs = require("fs/promises");
const { v4: uuid } = require("uuid");
const ProductManager = require("./productManager");

class CartManager extends ProductManager {
  constructor(path) {
    super(path);
  }

  //crea un carrito nuevo con id y con un array de productos vacios
  async addCart() {
    const carts = await this.getProducts();
    const id = uuid();
    const cart = { id, products: [] };
    carts.push(cart);
    await fs.writeFile(this.path, JSON.stringify(carts, null));
  }
  //toma el id de carrito y el id de producto, obtiene todo los carritos, revisa que el carrito del cid exista.
  //revisa que el id de producto exista o no en ese carrito, si no existe lo suma con cantidad 1, de lo contrario aniade una unidad
  //si no se necesita enviar mensaje al frontend se pueden quitar los return y mover la linea de escritura en db al final del condicional 
  async addProduct(cid, pid) {
    const carts = await this.getProducts();
    const indexCart = carts.map((cart) => cart.id).indexOf(cid);
    if (indexCart === -1) {
      return { error: `no cart found with id ${cid}` };
    } else {
      const cart = carts[indexCart];
      const productInCart = cart.products.find(product => product.id === pid)
      if(productInCart){
        productInCart.quantity++;
        await fs.writeFile(this.path, JSON.stringify(carts, null)); 
        return `product with id ${pid} has been added to cart for a total of ${productInCart.quantity} units`;
      }else{
        const product = {};
        product.id = pid;
        product.quantity = 1;
        cart.products.push(product)
        await fs.writeFile(this.path, JSON.stringify(carts, null)); 
        return `product with id ${pid} has been added to cart id ${cid}`;
      }
    }
}
}

module.exports = CartManager;