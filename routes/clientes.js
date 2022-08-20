const { Router } = require("express");

const {
  nuevoCliente,
  mostrarClientes,
  mostrarCliente,
  actualizarCliente,
  eliminarCliente,
} = require("../controllers/clientes.js");

const router = Router();

router.get("/", mostrarClientes);

router.get("/:id", mostrarCliente);

router.put("/", actualizarCliente);

router.post("/", nuevoCliente);

router.delete("/", eliminarCliente);

module.exports = router;
