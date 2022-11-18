const { BranchOffice, Province } = require("../models");

class ProvinceControllers {
  static async oneProvince(req, res) {
    try {
      const province = await Province.findOne({
        where: { id: req.params.id },
        include: {
          model: BranchOffice,
          as: "provincebranchoffice",
        },
      });
      return res.status(200).send(province);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async allProvinces(req, res) {
    try {
      const allProvince = await Province.findAll();
      return res.status(200).send(allProvince);
    } catch (error) {
      res.status(500).send(error);
    }
  }
}

module.exports = ProvinceControllers;
