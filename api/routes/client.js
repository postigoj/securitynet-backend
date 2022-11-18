const express = require("express");
const router = express.Router();
const Clientcontroller = require("../controllers/clientcontroller");

//regrista a un cliente y por defecto va estar activo apenas lo registre
router.post("/register", Clientcontroller.register);

//editar campos del cliente, la variable :id es el id del cliente, por el req.body llegarian los cambios
router.put("/edit/:id", Clientcontroller.editClient);

//cambia el estado del cliente inactivo va con params
router.put("/status/:id", Clientcontroller.off);

//trae un cliente con sus sucurusales
router.get("/:id", Clientcontroller.oneClient);

//trae a todos los clientes activos
router.get("/all/active", Clientcontroller.active);

//trae a todos los clientes activos
router.get("/all/inactive", Clientcontroller.inactive);

module.exports = router;
