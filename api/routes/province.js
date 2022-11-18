const express = require("express");
const router = express.Router();
const provinceControllers = require("../controllers/provincecontroller");

//trae todas las provincias en un arreglo
router.get("/", provinceControllers.allProvinces);

//trae una provincia con sus sucursuales
router.get("/:id", provinceControllers.oneProvince);

module.exports = router;
