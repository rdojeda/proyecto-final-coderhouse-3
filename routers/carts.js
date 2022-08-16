const { Router } = require("express");

const {
  cartsGetAll,
  cartsGet,
  cartsAddProducts,
  cartsPost,
  cartsDelete,
  cartsGetProducts,
} = require("../controllers/carts.js");

const router = Router();

router.get("/", cartsGetAll);

router.get("/:id", cartsGet);

router.get("/:id/productos", cartsGetProducts);

router.post("/", cartsPost);

router.post("/:id/products", cartsAddProducts);

router.delete("/:id/products/:productoId", cartsDelete);

module.exports = router;
