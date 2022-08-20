const express = require("express");
const cors = require("cors");
const routesUsers = require("../routes/users.js");
const routesProducts = require("../routes/products.js");
const routesCarts = require("../routes/carts.js");
const routesAuth = require("../routes/auth.js");
const routesPedidos = require("../routes/pedidos.js");
const routesClientes = require("../routes/clientes.js")
const morgan = require("morgan");
//const session = require("express-session");
//const sessionFilestore  = require("session-file-store")

//const fileStore = sessionFilestore(session)

const { dbConnection } = require("../database/config.js");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    //Paths routes
    this.usersPath = "/api/users";
    this.productsPath = "/api/products";
    this.cartsPath = "/api/carts";
    this.authPath = "/api/auth";
    this.pedidosPath = "/api/pedidos";
    this.clientesPath = "/api/clientes"

    //Conectar DB
    this.conectarDB();
    //Middlewares
    this.middlewares();
    //Rutas
    this.routes();
  }

  //Conexión base de datos
  async conectarDB() {
    await dbConnection();
  }

  //METODOS

  // Middlewares
  middlewares() {
    // Cors
    this.app.use(cors());
    //Directorio público
    this.app.use(express.static("public"));
    //Lectura y parseo del body
    this.app.use(express.json());
    //Morgan
    this.app.use(morgan("dev"));
    //urlenconded express
    this.app.use(express.urlencoded({ extended: true }));
   
  }

  routes() {
    this.app.use(this.authPath, routesAuth);
    this.app.use(this.cartsPath, routesCarts);
    this.app.use(this.usersPath, routesUsers);
    this.app.use(this.productsPath, routesProducts);
    this.app.use(this.pedidosPath, routesPedidos);
    this.app.use(this.clientesPath, routesClientes);
  }

  // Ejecutando server
  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto:", this.port);
    });
  }
}

module.exports = Server;
