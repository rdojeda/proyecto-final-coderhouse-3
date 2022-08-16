//Get All carts
const cartsGetAll = async (req, res) => {
  try {
    const carts = await api.getAll();
    carts
      ? res.status(200).json(carts)
      : res.status(404).json({ message: "No hay carritos disponibles" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Get carts By Id
const cartsGet = async (req, res) => {
  try {
    const cart = await api.getItem(req.params.id);
    cart
      ? res.status(200).json(cart)
      : res
          .status(404)
          .json({ message: "Carrito no encontrado. id: " + req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Create new cart
const cartsPost = async (req, res) => {
  try {
    const newCart = await api.create(req.body);
    res.status(201).json({
      message: "Carrito creado con éxito",
      cart: newCart,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Deleted product cart
const cartsDelete = async (req, res) => {
  try {
    const cart = await api.getItem(req.params.id);
    const productId = req.params.productId;
    if (cart && productId) {
      const cartUpdate = await api.deleteProduct(cart, productId);
      const newCart = await api.getItem(cartUpdate._id);
      res.status(200).json({
        message: "Producto eliminado con éxito",
        cart: newCart,
      });
    }
    if (!cart) {
      res
        .status(404)
        .json({ message: "Carrito no encontrado. id: " + req.params.id });
    }
    if (!productId) {
      res.status(404).json({ message: "El producto no existe" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get products cart
const cartsGetProducts = async (req, res) => {
  try {
    const cart = await api.getItem(req.params.id);
    cart
      ? res.status(200).json(cart.products)
      : res
          .status(404)
          .json({ message: "Carrito no encontrado. id: " + req.params.id });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Add products in cart
const cartsAddProducts = async (req, res) => {
  try {
    const cart = await api.getItem(req.params.id);
    const products = req.body; // array de objetos
    if (cart && products) {
      const cartUpdate = await api.addProductos(cart, products);
      const newCart = await api.getItem(cartUpdate._id);
      res.status(201).json({
        message: "Productos agregados con éxito",
        cart: newCart,
      });
    }
    if (!cart) {
      res
        .status(404)
        .json({ message: "Carrito no encontrado. id: " + req.params.id });
    }
    if (!products) {
      res.status(404).json({ message: "La lista de productos está vacía" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, line: err.line });
  }
};

module.exports = {
  cartsGetAll,
  cartsGet,
  cartsAddProducts,
  cartsPost,
  cartsDelete,
  cartsGetProducts,
};
