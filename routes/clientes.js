const { Router } = require("express");

const {
  clientesGet,
  clientesGetAll,
  clientesPut,
  clientesPost,
  clientesDelete,
} = require("../controllers/clientes.js");

const router = Router();

router.get("/", clientesGetAll);

router.get("/:id", clientesGet);

router.put("/", clientesPut);

router.post("/", clientesPost);

router.delete("/", clientesDelete);

module.exports = router;
