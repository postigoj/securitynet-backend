const express = require("express");
const router = express.Router();
const Reportcontroller = require("../controllers/reportcontroller");

//ruta para que el guardia registre su hora de trabajo-- por req.body envia latitud y longitud
router.post(
  "/isthere/:securityguardId/:branchofficeId",
  Reportcontroller.isThere
);

//ruta para el guardia termina su jornada laboral
router.put("/logout/:securityguardId", Reportcontroller.logout);
module.exports = router;
