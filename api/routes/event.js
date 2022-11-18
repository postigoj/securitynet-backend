const express = require("express");
const router = express.Router();
const eventController = require("../controllers/eventcontroller");

//ruta para dar de alta un evento se necesita por params id del guardia y del branchoffice
router.post("/add/:securityGuardId/:branchOfficeId", eventController.register);


//ruta para dar de baja un evento
router.delete("/unsubscribe/:id", eventController.unsubscribe);

//ruta para modificar evento
router.put("/edit/:eventId", eventController.edit);


//ruta para obtener todos los eventos de un guardia en especifico se necesita el params el branchOfficeId 
router.get("/branchoffices/:branchOfficeId", eventController.allguards);

//ruta para obtener todos los eventos de un guarida en especifico se necesita el params el securityguardid
router.get("/securityguards/:securityGuardId", eventController.allbranchoffices);

module.exports = router;
