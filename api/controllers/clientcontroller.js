const { Client, BranchOffice } = require("../models");

class Clientcontroller {
  static async register(req, res) {
    try {
      await Client.create(req.body);
      const allClient = await Client.findAll({ where: { isActive: true } });
      console.log(allClient)
      return res.status(201).send(allClient);
    } catch (error) {
      console.log(error)
      res.status(500).send(error);
    }
  }
  static async editClient(req, res) {
    try {
      console.log(req.body);
      console.log(req.params.id);
      const clientId = req.params.id;
      await Client.update(req.body, { where: { id: clientId } });
      const allClient = await Client.findAll({ where: { isActive: true } });
      return res.status(201).send(allClient);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  static async oneClient(req, res) {
    try {
      const client = await Client.findOne({
        where: { id: req.params.id },
        include: {
          model: BranchOffice,
          as: "clientbranchoffice",
        },
      });
      return res.status(200).send(client);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async active(req, res) {
    try {
      const allClient = await Client.findAll({ where: { isActive: true } });
      res.status(200).send(allClient);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async inactive(req, res) {
    try {
      const inactive = await Client.findAll({ where: { isActive: false } });
      res.status(200).send(inactive);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

  static async off(req, res) {
    try {
      await Client.update({isActive:false}, { where: { id: req.params.id } });//actualiza
      const active = await Client.findAll({where:{isActive:true}});
      return res.status(200).send(active);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = Clientcontroller;
