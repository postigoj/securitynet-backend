const express = require("express");
const router = express.Router();
const Guardcontroller = require("../controllers/guardcontroller");
const validateAuthsecurityguard = require("../middleware/authsecurityguard");

//ruta para el login del guardia de seguridad un objeto req.body con email y el password
router.post("/login", Guardcontroller.login);

//ruta para el logout del guardia de seguridad
router.post("/logout", Guardcontroller.logout);

//ruta para el register del guardia de seguridad-va por reqbody
router.post("/register", Guardcontroller.register);

//ruta para enviar el codigo de verificacion al loguearse, necesitamos el id del guardia
router.post("/verify/:id", Guardcontroller.verify);

//barra me del vigilante
router.get("/me", validateAuthsecurityguard, (req, res) => {
  res.send(req.user);
});

//ruta para el update del guardia de seguridad se hace con el id pasado por params
router.put("/update/:id", Guardcontroller.update);

//cambia el estado del guardia a inactivo va con params
router.put("/status/:id", Guardcontroller.off);

// ruta para traer todos los vigilantes en un arreglo
router.get("/", Guardcontroller.all);

// ruta para traer todos los vigilantes activos en un arreglo
router.get("/all/active", Guardcontroller.allactive);

// ruta para traer todos los vigilantes inactivos en un arreglo(si la necesitan descomenten)
//router.get("/all/inactive", Guardcontroller.allinactive);

//trae a un guardia/as filtrado por branchoffice por params
router.get("/:id", Guardcontroller.findone);

//
//ruta para localizar a todos los guardias cerca de la sucursal
router.get("/all/branchoffices/:id", Guardcontroller.allGeoBranch);

//ruta para enviar mail para redirigir a cambiar la contraseña, recibe por req body el email del usuario
router.put("/forgot-password", Guardcontroller.forgotPassword);

//ruta para resetear la password, recibe por req body el nuevo password y su email
router.put("/create-new-password", Guardcontroller.createNewPassword);

module.exports = router;
