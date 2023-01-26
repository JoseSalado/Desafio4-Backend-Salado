const products = require('../controllers/products.controllers')
const carts = require('../controllers/carts.controllers')
const productsHBS = require('../controllers/productsHBS.controllers')
const realTimeProducts = require('../controllers/realTimeProducts.controllers')

const routes = (app) => {
    app.use('/api/products', products)
    app.use('/api/carts', carts)    
    app.use('/realtimeproducts', realTimeProducts)
    app.use('/api/home', productsHBS)   
}

module.exports = routes         