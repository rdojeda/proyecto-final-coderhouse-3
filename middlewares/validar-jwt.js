const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const validarJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la petición",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    //Leer user que corresponde al uid
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: "Token no válido - user no existe en BD",
      });
    }

    //Verificar si el user tiene estado true
    if (!user.state) {
      return res.status(401).json({
        msg: "Token no válido - user state = false",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no válido",
    });
  }
};

module.exports = { validarJWT };
