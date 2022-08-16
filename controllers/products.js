const productsGetAll = async (req, res) => {
  try {
    const products = await api.getAll();
    products
      ? res.status(200).json(products)
      : res.status(404).json({ message: "No hay productos disponibles" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const productsGet = async (req, res) => {
  try {
    const product = await api.getItem(req.params.id);
    product
      ? res.status(200).json(product)
      : res
          .status(404)
          .json({ message: "Producto no encontrado. id: " + req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const productsPut = async (req, res) => {
  try {
    const productUpdate = await api.update(req.params.id, req.body);
    res.json({
      message: "Producto actualizado correctamente",
      id: productUpdate._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const productsPost = async (req, res) => {
  try {
    const newProduct = await api.create(req.body);
    res.status(201).json({
      message: "Producto creado con éxito",
      producto: newProduct,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const productsDelete = async (req, res) => {
  try {
    const productDelete = await api.delete(req.params.id);
    res.json({
      message: "Producto borrado correctamente",
      id: productDelete._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  productsGetAll,
  productsGet,
  productsPut,
  productsPost,
  productsDelete,
};
