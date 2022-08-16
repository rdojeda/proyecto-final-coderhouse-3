const Role = require("../models/role.js");
const User = require("../models/user.js");

const esRoleValido = async (role = "") => {
  const isRole = await Role.findOne({ role });
  if (!isRole) {
    throw new Error(`El role ${role} no se encuentra registrado en la BD`);
  }
};

const emailExiste = async (email = "") => {
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    throw new Error(`El email: ${email} ya se encuentra registrado en la BD`);
  }
};

const userExistePorId = async (id) => {
  const isUser = await User.findById(id);
  if (!isUser) {
    throw new Error(`El id: ${id} no existe en la BD`);
  }
};

module.exports = {
  esRoleValido,
  emailExiste,
  userExistePorId,
};
