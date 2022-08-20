const { Router } = require("express");

const {
  subirArchivo,
  nuevoProducto,
  mostrarProductos,
  mostrarProducto,
  actualizarProducto,
  eliminarProducto,
  buscarProducto,
} = require("../controllers/products.js");

const router = Router();

router.get("/", mostrarProductos);

router.get("/:id", mostrarProducto);

router.put("/", actualizarProducto);

router.post("/", nuevoProducto);

router.delete("/", eliminarProducto);

module.exports = router;
