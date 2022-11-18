const express = require("express");
const router = express.Router();
const Admincontroller = require("../controllers/admincontroller");
const validateAuth = require("../middleware/auth");

//ruta para el login del administrador un objeto req.body con email y el password
router.post("/login", Admincontroller.login);

//ruta para el logout del administrador
router.post("/logout", Admincontroller.logout);

//ruta para el registro del administrador necesita un objeto req.body con email y el password
router.post("/register", Admincontroller.register);

// ruta para traer todos los admins en un arreglo
router.get("/", Admincontroller.allAdmin);

// edita los campos del admin
router.put("/edit/:id", Admincontroller.editAdmin);

//eliminar un admin de la base de datos
router.delete("/delete/:id", Admincontroller.deleteAdmin);

router.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

//ruta para enviar mail para redirigir a cambiar la contraseña, recibe por req body el email del usuario
router.put('/forgot-password', Admincontroller.forgotPassword)

 //ruta para resetear la password, recibe por req body el nuevo password, y el token
router.put('/create-new-password', Admincontroller.createNewPassword)

module.exports = router;
