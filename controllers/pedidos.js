const Pedidos = require("../models/pedido");
const twilio = require('twilio')
const nodemailer = require('nodemailer');

//Agrega nuevo Pedido 
const nuevoPedido = async (req, res, next) => {
  const pedido = new Pedidos(req.body);
  try {
    await pedido.save();
    res.json({ mensaje: "Se agregó un nuevo pedido" });
    // Correo desde Ethereal
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
          user: process.env.USER_ETHEREAL_MAIL,
          pass: process.env.PASS_ETHEREAL_MAIL,
        },
      });
      await transporter.sendMail({
        from: "Site Web - Nuevo Pedido",
        to: process.env.USER_ETHEREAL_MAIL,
        subject: "Nuevo Pedido",
        html: `
        <h1>Este es un Correo de Prueba</h1>
        <p>Recibimos un nuevo pedido prueba Ethereal</p>
        <h2>Datos del cliente</h2>
        <p>nombre: Roberto Ojeda </p>
        <p>email: roberto@correo.com</p>
        <hr>
        <h2>Domicilio de envio</h2>
        <p>Calle 0000 - Piso 00 - Dto 0</p>
        <p>CABA</p>
        <hr>
        <h2>Producto</h2>
        <p>Remera Nike </p>
        <p>Remera Nike SportWear</p>
        <p>Cantidad: 1 </p>
        <p>Precio $ 1000 </p>
      `,
      });
    
    //Mensaje desde Twilio
    const twilioAccount = twilio('AC5fff22849d9c43978013ed6c999d6cea', '1ad6f5ed203a66d0d2250f342a0dd90c');
    
    twilioAccount.messages.create({
      body: "Recibimos un Nuevo Pedido",
      from: "+12517147842",
      to: "+541138730192",
    
    
    });


  } catch (error) {
    console.log(error);
    next();
  }
};

// Muestra todos los pedidos
const mostrarPedidos = async (req, res, next) => {
  try {
    const pedidos = await Pedidos.find({}).populate("cliente").populate({
      path: "pedido.producto",
      model: "Productos",
    });

    res.json(pedidos);
  } catch (error) {
    console.log(error);
    next();
  }
};

// Muestra un pedido por su ID
const mostrarPedido = async (req, res, next) => {
  const pedido = await Pedidos.findById(req.params.idPedido)
    .populate("cliente")
    .populate({
      path: "pedido.producto",
      model: "Productos",
    });

  if (!pedido) {
    res.json({ mensaje: "Ese no pedido no existe" });
    return next();
  }

  // mostrar el pedido
  res.json(pedido);
};

// Actualizar el pedido via ID
const actualizarPedido = async (req, res, next) => {
  try {
    let pedido = await Pedidos.findOneAndUpdate(
      { _id: req.params.idPedido },
      req.body,
      {
        new: true,
      }
    )
      .populate("cliente")
      .populate({
        path: "pedido.producto",
        model: "Productos",
      });

    res.json(pedido);
  } catch (error) {
    console.log(error);
    next();
  }
};

// elimina un pedido por su id
const eliminarPedido = async (req, res, next) => {
  try {
    await Pedidos.findOneAndDelete({ _id: req.params.idPedido });
    res.json({ mensaje: "El pedido se ha eliminado" });
  } catch (error) {
    console.log(error);
    next();
  }
};

module.exports = {
    nuevoPedido,
    mostrarPedidos,
    mostrarPedido,
    actualizarPedido,
    eliminarPedido
}