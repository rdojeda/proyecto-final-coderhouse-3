const { Router } = require("express");
const { check } = require("express-validator");
const {
  esRoleValido,
  emailExiste,
  userExistePorId,
} = require("../helpers/db-validators.js");
const { validarCampos } = require("../middlewares/validar-campos.js");
const { validarJWT } = require("../middlewares/validar-jwt");

const {
  usersGet,
  usersPut,
  usersPost,
  usersDelete
  
} = require("../controllers/users.js");

const router = Router();

router.get("/", usersGet);

router.put(
  "/:id",

  check("id", "No es un ID válido").isMongoId(),
  check("id").custom(userExistePorId),
  check("role").custom(esRoleValido),
  validarCampos,
  usersPut
);

router.post(
  "/",
  [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El formato del correo no es válido").isEmail(),
    check("email").custom(emailExiste),
    check("password", "El password debe tener más de 6 letras").isLength({
      min: 6,
    }),
    check("role").custom(esRoleValido),
    validarCampos,
  ],
  usersPost
);

router.delete(
  "/:id",
  validarJWT,
  check("id", "No es un ID válido").isMongoId(),
  check("id").custom(userExistePorId),
  validarCampos,
  usersDelete
);



module.exports = router;
