const User = require("../models/user.js");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt.js");

//Registración de usuario

const register = async (req, res) => {
  // leer los datos del usuario y colocarlos en Usuarios
  const user = new User(req.body);
  user.password = await bcrypt.hash(req.body.password, 12);
  try {
    await user.save();
    res.json({ mensaje: "Usuario Creado Correctamente" });
    //Enviar correo
  } catch (error) {
    console.log(error);
    res.json({ mensaje: "Hubo un error" });
  }
};

//Login de usuario
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    //Verificar si el email existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        msg: "User / Password incorrectos - correo ",
      });
    }
    //Validar si el usaurio está activo
    if (!user.state) {
      return res.status(400).json({
        msg: "User / Password incorrectos - estado: false",
      });
    }

    //Verificar el password
    const passwordValid = bcryptjs.compareSync(password, user.password);
    if (!passwordValid) {
      return res.status(400).json({
        msg: "User / Password incorrectos - password",
      });
    }

    //Generar el JWT
    const token = await generarJWT(user.id);

    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "Algo salió mal, comunicarse con el Administrador",
    });
  }
};

module.exports = {
  login,
  register,
};
