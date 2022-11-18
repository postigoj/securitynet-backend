const express = require("express");
const router = express.Router();
const adminRouter = require("./admin");
const securityGuardRouter = require("./securityguard");
const clientRouter = require("./client");
const branchOfficeRouter = require("./branchOffice");
const eventRouter = require("./event");
const provinceRouter = require("./province");
const reportRouter= require("./report");

router.use("/admin", adminRouter);
router.use("/securityguard", securityGuardRouter);
router.use("/client", clientRouter);
router.use("/branchoffice", branchOfficeRouter);
router.use("/province", provinceRouter);
router.use("/event", eventRouter);
router.use("/report", reportRouter);

module.exports = router;
