const { Router } = require("express");

const {
  nuevoCarrito,
  mostrarCarrito,
  mostrarCarritos,
  carritoEliminarProducto,
  carritoAgregarProductos,
} = require("../controllers/carts.js");

const router = Router();

router.get("/", mostrarCarritos);

router.get("/:id", mostrarCarrito);

router.post("/", nuevoCarrito);

router.post("/:id/products", carritoAgregarProductos);

router.delete("/:id/products/:productoId", carritoEliminarProducto);

module.exports = router;
