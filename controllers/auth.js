const User = require("../models/user.js");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt.js");

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
};
