const {
  Client,
  BranchOffice,
  SecurityGuard,
  Province,
  Event,
} = require("../models");
const { getDistancieGuard } = require("../utils/geolocation");

class BranchOfficeController {
  static async register(req, res) {
    try {
      //id del cliente
      const clientId = req.params.id;
      //en el body tiene que llegar una propiedad province y el nombre exaxto de la provincia
      const nameProvince = req.body.province;

      //solo se va a crear si matchea el id con un id existente en la db y si el nombre de la provincia es correcto y existe
      const dataClient = await Client.findOrCreate({ where: { id: clientId } });
      const dataProvince = await Province.findOrCreate({
        where: { name: nameProvince },
      });
      const client = dataClient[0];
      const province = dataProvince[0];

      const newBranchOffice = await BranchOffice.create(req.body);

      await client.addClientbranchoffice(newBranchOffice);
      await province.addProvincebranchoffice(newBranchOffice);

      const allBranchOffice = await BranchOffice.findAll({
        where: { clientId, isActive: true },
        include: [
          {
            model: Province,
          },
        ],
      });
      //para traer todas las branchoffice luego del register
      return res.status(201).send(allBranchOffice);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
  static async editBranchOffice(req, res) {
    try {
      const branchOfficeId = req.params.id;
      const clientId = req.params.clientId;
      const nameProvince = req.body.province;

      await BranchOffice.update(req.body, {
        where: { id: branchOfficeId },
      });

      if (nameProvince) {
        const province = await Province.findOne({
          where: { name: nameProvince },
        });

        const newBranchOffice = await BranchOffice.findOne({
          where: { id: branchOfficeId },
        });
        await province.setProvincebranchoffice(newBranchOffice);
      }
      const allBranchOffices = await BranchOffice.findAll({
        where: { clientId, isActive: true },
        include: [
          {
            model: Province,
          },
        ],
      });

      return res.status(201).send(allBranchOffices);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  static async oneBranchOffice(req, res) {
    try {
      const branchOffice = await BranchOffice.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: SecurityGuard,
            as: "guardbranchoffice",
          },
          {
            model: Client,
            as: "client",
          },
          { model: Province },
          { model: Event, as: "branchOfficeEvent" },
        ],
      });
      return res.status(200).send(branchOffice);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  static async allBranchOffice(req, res) {
    try {
      const allBranchOffices = await BranchOffice.findAll({
        where: { clientId: req.params.id, isActive: true },
        include: [
          {
            model: Province,
          },
        ],
      });
      return res.status(200).send(allBranchOffices);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async off(req, res) {
    try {
      await BranchOffice.update(
        { isActive: false },
        { where: { id: req.params.id } }
      ); //actualiza
      const active = await BranchOffice.findAll({
        where: { isActive: true, clientId: req.params.clientId },
        include: [
          {
            model: Client,
          },
          {
            model: Province,
          },
        ],
      });
      return res.status(200).send(active);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async allGeoGuards(req, res) {
    try {
      //fecha
      const { dateevent } = req.headers;
      console.log("dateevent", dateevent);
      //la scursal a buscar
      const branchOffice = await BranchOffice.findByPk(req.params.id);
      const { provinciaId } = branchOffice;
      //guardias disponibles de la provincia donde esta la sucursal
      const securityGuard = await SecurityGuard.findAll({
        where: { isWorking: false, isActive: true, provinciaId: provinciaId },
      });

      const mapDistance = getDistancieGuard(branchOffice, securityGuard);

      const arrGuard = [];
      const eventFilter = mapDistance.map(async (guard) => {
        const event = await Event.findAll({
          where: { securityguardId: guard.id, date: dateevent },
        });

        if (!event.length) {
          arrGuard.push(guard);
        }
      });
      const result = await Promise.all(eventFilter);

      return res.send(arrGuard);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
}

module.exports = BranchOfficeController;
