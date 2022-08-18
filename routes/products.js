const { Router } = require("express");

const {
  productsGet,
  productsGetAll,
  productsPut,
  productsPost,
  productsDelete,
} = require("../controllers/products.js");

const router = Router();

router.get("/", productsGetAll);

router.get("/:id", productsGet);

router.put("/", productsPut);

router.post("/", productsPost);

router.delete("/", productsDelete);

module.exports = router;
