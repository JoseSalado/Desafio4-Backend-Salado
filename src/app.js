const express = require('express')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')
require('dotenv').config()
const ProductManager = require("./managers/productManager");

const routes = require('./routes')   

const app = express()   

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/public'))

routes(app);  

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

const httpServer = app.listen(process.env.PORT, () => {
    console.log(`server running at port ${httpServer.address().port}`);
})

const io = new Server(httpServer)
const path = './src/db/products/products.json'
const productManager = new ProductManager(path)

io.on('connection', socket => { 
    console.log(`user connected: ${socket.id}`);
    productManager.getProducts().then(data => io.emit('message', data))
})          