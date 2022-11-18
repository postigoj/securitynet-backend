const { SecurityGuard, BranchOffice, Event } = require("../models");
const { findByPk } = require("../models/Admin");

class Eventcontroller {
  static async register(req, res) {
    try {
      //variables de los params y el body
      const { securityGuardId, branchOfficeId } = req.params;
      const { date, star, end,title } = req.body;

      //datos completos de los guardias y las sucrusulares
      const dataSecuirityGuard = await SecurityGuard.findOrCreate({
        where: { id: securityGuardId },
      });
      const dataBranchOffice = await BranchOffice.findOrCreate({
        where: { id: branchOfficeId },
      });
      const securityGuard = dataSecuirityGuard[0];
      const branchOffice = dataBranchOffice[0];

      //creacion de evento
      const createEvent = await Event.create(req.body);

      //asigna la sucrusal al guardia
      await securityGuard.addGuardbranchoffice(branchOffice);
      //asigna un evento a un guardia
      // await createEvent.addGuardEvent(securityGuard);
      await securityGuard.addGuardEvent(createEvent);
      //asgina un evento a una sucursal
      await branchOffice.addBranchOfficeEvent(createEvent);

      const newEvent = await Event.findOne({
        where: { id: createEvent.id },
        include: [
          {
            model: BranchOffice,
          },
          {
            model: SecurityGuard,
          },
        ],
      });

      return res.status(201).send(newEvent);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
  static async unsubscribe(req, res) {
    try {
      const eventId = req.params.id;
      const { securityGuardId, branchOfficeId } = req.body;

      //datos completos de los guardias y las sucrusulares
      const securityGuard = await SecurityGuard.findByPk(securityGuardId);
      const branchOffice = await BranchOffice.findByPk(branchOfficeId);
      const event = await Event.findByPk(eventId);

      await branchOffice.removeBranchOfficeEvent(event);
      await securityGuard.removeGuardEvent(event);

      const allEventos = await securityGuard.getGuardEvent();
      if (allEventos.length === 0) {
        await securityGuard.removeGuardbranchoffice(branchOffice);
      }

      const data = await Event.destroy({ where: { id: eventId } });
      console.log("event", event);
      return res.status(200).send(event.dataValues);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  static async edit(req, res) {
    try {
      const { eventId } = req.params;
      const { securityGuardId, branchOfficeId, start, end, title, date } = req.body;

      await Event.update({start,end,date,title}, { where: { id: eventId } });

      const securityGuard = await SecurityGuard.findByPk(securityGuardId);
      const branchOffice = await BranchOffice.findByPk(branchOfficeId);
      const event = await Event.findByPk(eventId);

      await branchOffice.setBranchOfficeEvent(event);
      await securityGuard.setGuardEvent(event);

      const newEvent = await Event.findOne({
        where: { id: eventId },
        include: [
          {
            model: BranchOffice,
          },
          {
            model: SecurityGuard,
          },
        ],
      });
      return res.status(201).send(newEvent);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  static async allguards(req, res) {
    try {
      const allEvents = await Event.findAll({
        where: { branchofficeId: req.params.branchOfficeId },
        include: [
          {
            model: BranchOffice,
          },
          {
            model: SecurityGuard,
          },
        ],
      }); //devuelve todos los eventos de un sucursal
      return res.status(200).send(allEvents);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  static async allbranchoffices(req, res) {
    try {
      const securityguard = await SecurityGuard.findByPk(
        req.params.securityGuardId
      );
      const allGuards = await securityguard.getGuardEvent();
      const mapa = await allGuards.map(async ({ id }) => {
        const eventos = await Event.findByPk(id, {
          include: { model: BranchOffice },
        });

        return eventos;
      });
      const promesas = await Promise.all(mapa);

      console.log(mapa);
      return res.status(200).send(promesas);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
}

module.exports = Eventcontroller;
