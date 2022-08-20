const Clientes = require("../models/cliente");

// agrega un nuevo cliente
 const nuevoCliente = async (req, res, next) => {
  const cliente = new Clientes(req.body);

  try {
    // almacenar el registro
    await cliente.save();
    res.json({ mensaje: "Se agrego un nuevo cliente" });
  } catch (error) {
    // si hay un error, console.log y next
    res.send(error);
    next();
  }
};

// Muestra todos los clientes
const mostrarClientes = async (req, res, next) => {
  try {
    const clientes = await Clientes.find({});
    res.json(clientes);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Muestra un cliente por su ID
const mostrarCliente = async (req, res, next) => {
  const cliente = await Clientes.findById(req.params.idCliente);

  if (!cliente) {
    res.json({ mensaje: "Ese cliente no existe" });
    next();
  }
  // Mostrar el cliente
  res.json(cliente);
};

// Actualiza un cliente por su ID
const actualizarCliente = async (req, res, next) => {
  try {
    const cliente = await Clientes.findOneAndUpdate(
      { _id: req.params.idCliente },
      req.body,
      {
        new: true,
      }
    );
    res.json(cliente);
  } catch (error) {
    res.send(error);
    next();
  }
};

// Elimina un cliente por su ID
const eliminarCliente = async (req, res, next) => {
  try {
    await Clientes.findOneAndDelete({ _id: req.params.idCliente });
    res.json({ mensaje: "El cliente se ha eliminado" });
  } catch (error) {
    console.log(error);
    next();
  }
};


module.exports = {
    nuevoCliente,
    mostrarClientes,
    mostrarCliente,
    actualizarCliente,
    eliminarCliente
}