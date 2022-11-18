const express = require("express");
const router = express.Router();
const BranchOfficeController = require("../controllers/branchofficecontroller");

//agrega una sucursal a un cliente se le pasa por params el id del cliente y en el body va la la direccion de la sucursal y a que provincia pertenece
router.post("/register/:id", BranchOfficeController.register);

//editar campos de la sucursal, la variable :id es el id de la sucursal,la de :clientId del cliente y por el req.body llegarian los cambios a cambiar
router.put("/edit/:id/:clientId", BranchOfficeController.editBranchOffice);

//cambia el estado de la sucursal inactivo va con params del cliente y params de la sucursal
router.put("/status/off/:clientId/:id", BranchOfficeController.off);

//trae a un sucursal con sun guardias de seguridad , a que client pertenece y a que provincia pertenece
router.get("/:id", BranchOfficeController.oneBranchOffice);

//trae todas las sucursales de un cliente (id por req params)
router.get("/all/:id", BranchOfficeController.allBranchOffice);

//ruta para localizar a todos los guardias cerca de la sucursal
router.get("/all/guards/:id", BranchOfficeController.allGeoGuards);

module.exports = router;
