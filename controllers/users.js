const User = require("../models/user");
const bcryptjs = require("bcryptjs");

const usersGet = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { state: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);

  res.json({
    total,
    users,
  });
};

const usersPut = async (req, res) => {
  const { id } = req.params;
  const { _id, password, google, email, ...resto } = req.body;

  //Validar todo contro BD
  if (password) {
    //Encriptar password
    const salt = bcryptjs.genSaltSync(10);
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, resto);

  res.json(user);
};

const usersPost = async (req, res) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //Encriptar password
  const salt = bcryptjs.genSaltSync(10);
  user.password = bcryptjs.hashSync(password, salt);

  await user.save();

  res.json(user);
};

const usersDelete = async (req, res) => {
  const { id } = req.params;

  // Borrado físico
  // const user = await User.findByIdAndDelete(id);

  const user = await User.findByIdAndUpdate(id, { state: false });

  res.json({ user });
};

const usersPatch = (req, res) => {
  res.json({
    msg: "patch API - users",
  });
};

module.exports = { usersGet, usersPut, usersPost, usersDelete, usersPatch };
