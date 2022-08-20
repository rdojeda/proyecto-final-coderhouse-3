const { Router } = require("express");

const {
  nuevoPedido,
  mostrarPedidos,
  mostrarPedido,
  actualizarPedido,
  eliminarPedido,
} = require("../controllers/pedidos.js");

const router = Router();

router.get("/", mostrarPedidos);

router.get("/:id", mostrarPedido);

router.put("/", actualizarPedido);

router.post("/", nuevoPedido);

router.delete("/", eliminarPedido);

module.exports = router;
