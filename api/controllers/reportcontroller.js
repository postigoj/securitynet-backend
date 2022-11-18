const {
  SecurityGuard,
  BranchOffice,
  Province,
  Event,
  Report,
} = require("../models");
const { getRadius, isThere } = require("../utils/geolocation");

class Reportcontroller {
  static async isThere(req, res) {
    try {
      //viene por req.params el id del guardia y de la branchoffice
      //el vigilante trae por req.body la longitud y latitud de su ubicacion
      const { branchofficeId, securityguardId } = req.params;
      const { longitude, latitude, hour } = req.body;
      //busca el branchoffice
      const databranchoffice = await BranchOffice.findOrCreate({
        where: { id: branchofficeId },
      });
      //busca el securityguard
      const dataguard = await SecurityGuard.findOrCreate({
        where: { id: securityguardId },
      });

      const branchOffice = databranchoffice[0];
      const guard = dataguard[0];

      const brand = getRadius(
        branchOffice.latitude,
        branchOffice.longitude,
        0.2
      );
      const work = isThere(latitude, longitude,brand);
      let report = "";
      if (work) {
        report = await Report.create({
          hour:hour,
          latitude: latitude,
          longitude: longitude,
          isInRange: work,
          workedHours: 8,
        });
        let count = Number(report.workedHours) + Number(guard.totalWorkedHours);

        await guard.addGuardsreport(report);
        await guard.update({ isWorking: true, totalWorkedHours: count });
      } else {
        report = await Report.create({
          hour:hour,
          latitude: latitude,
          longitude: longitude,
          isInRange: work,
          workedHours: 0,
        });
        await guard.addGuardsreport(report);
      }

      return res.status(201).send(report);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
  static async logout(req, res) {
    try {
      const { securityguardId } = req.params;
      const guard = await SecurityGuard.findByPk(securityguardId);
      await guard.update({ isWorking: false });
      const newGuard = SecurityGuard.findByPk(securityguardId);
      return res.status(205).send(newGuard);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
}

module.exports = Reportcontroller;
