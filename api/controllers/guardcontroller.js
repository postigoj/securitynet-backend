const {
  SecurityGuard,
  BranchOffice,
  Province,
  Event,
  Report,
} = require("../models");
const random = require("number-random");
const { generateToken, validateToken } = require("../config/token");
const { getDistancieBranch } = require("../utils/geolocation");
const jwt = require("jsonwebtoken");
const transporter = require("../config/mailer");
require("dotenv").config();

class Guardcontroller {
  static async login(req, res) {
    try {
      //req.body agarrado del formulario
      const { email, password } = req.body;
      //busca en la base de datos al guardia con ese email
      const securityGuard = await SecurityGuard.findOne({
        where: { email: email },
        include: [
          {
            model: BranchOffice,
            as: "guardbranchoffice",
          },
          { model: Province },
          { model: Event, as: "guardEvent" },
          { model: Report, as: "guardsreport" },
        ],
      });
      //si no esta no esta autorizado
      if (!securityGuard) return res.sendStatus(401);
      //valida si la password es correcta
      const isValid = await securityGuard.validatePassword(password);
      if (!isValid) return res.sendStatus(401);

      

      //informacion con la que se genera el token
      const payload = {
        id: securityGuard.id,
        name: securityGuard.name,
        lastname: securityGuard.lastname,
        isWorking: securityGuard.isWorking,
        email: securityGuard.email,
        isactive: securityGuard.isactive,
        reseted: securityGuard.reseted,
      };

      const token = generateToken(payload);

      return res.send({...payload, token});
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  static async register(req, res) {
    try {
      const nameProvince = req.body.province;
      const dataProvince = await Province.findOrCreate({
        where: { name: nameProvince },
      });
      const province = dataProvince[0];

      const newSecurityguard = await SecurityGuard.create(req.body); //registra el guardia

      await province.addProvincesecurityguard(newSecurityguard);

      const allGuards = await SecurityGuard.findAll({
        where: { isActive: true },
        include: [
          { model: Province },
          { model: BranchOffice, as: "guardbranchoffice" },
        ],
      }); //devuelve todos los guardias

      return res.status(201).send(allGuards);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  static async logout(req, res) {
    try {
      return res.clearcookie("securityguard").status(204);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async update(req, res) {
    try {
      const guardId = req.params.id;
      const nameProvince = req.body.province;

      await SecurityGuard.update(req.body, { where: { id: guardId } });
      if (nameProvince) {
        const province = await Province.findOne({
          where: { name: nameProvince },
        });

        const newSecurityguard = await SecurityGuard.findOne({
          where: { id: guardId },
        });
        await province.addProvincesecurityguard(newSecurityguard);
      }
      const allGuards = await SecurityGuard.findAll({
        where: { isActive: true },
        include: [
          { model: Province },
          { model: BranchOffice, as: "guardbranchoffice" },
        ],
      }); //devuelve todos los guardias
      return res.status(201).send(allGuards);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async allactive(req, res) {
    try {
      const allGuards = await SecurityGuard.findAll({
        where: { isActive: true },
        include: [
          { model: Province },
          { model: BranchOffice, as: "guardbranchoffice" },
        ],
      }); //devuelve todos los guardias
      return res.status(200).send(allGuards);
    } catch (error) {
      res.status(500).send(error);
    }
  }
  // static async allinactive(req, res) {
  //   try {
  //     const allGuards = await SecurityGuard.findAll({where:{isActive:false}});
  //     return res.status(200).send(allGuards);
  //   } catch (error) {
  //     res.status(500).send(error);
  //   }
  // }
  static async all(req, res) {
    try {
      const allsegurity = await SecurityGuard.findAll();
      return res.status(200).send(allsegurity);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async findone(req, res) {
    try {
      const guard = await SecurityGuard.findOne({
        where: { id: req.params.id },
        include: [
          {
            model: BranchOffice,
            as: "guardbranchoffice",
          },
          { model: Province },
          { model: Event, as: "guardEvent" },
          { model: Report, as: "guardsreport" },
        ],
      });
      return res.status(200).send(guard);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }

  static async off(req, res) {
    try {
      await SecurityGuard.update(
        { isActive: false },
        { where: { id: req.params.id } }
      ); //actualiza

      const allGuards = await SecurityGuard.findAll({
        where: { isActive: true },
        include: [
          { model: Province },
          { model: BranchOffice, as: "guardbranchoffice" },
        ],
      }); //devuelve todos los guardias
      return res.status(200).send(allGuards);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async allGeoBranch(req, res) {
    try {
      //la sucursal a buscar
      const securityGuard = await SecurityGuard.findByPk(req.params.id);
      const { provinciaId } = securityGuard;
      //guardias disponibles de la provincia donde esta la sucursal
      const branchOffice = await BranchOffice.findAll({
        where: { isActive: true, provinciaId: provinciaId },
      });

      const map = getDistancieBranch(branchOffice, securityGuard);

      return res.send(map);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
  static async forgotPassword(req, res) {
    const { email } = req.body;

    if (!email) return res.status(400).send("Hace falta enviar un email");

    const message =
      "Un mail fue enviado a tu casilla de correo para restablecer la contraseña";
    let verificationLink;
    let emailStatus = "OK";

    try {
      const user = await SecurityGuard.findOne({ where: { email } });
      if (!user) return res.status(400).send("No se encontro un usuario");
      let randomcode; // esta variable guarda el numero random generado

      //aca generamos el codigo random
      randomcode = await random(111111, 999999);

      await user.update({ code: randomcode });

      // send mail with defined transport object
      await transporter.sendMail({
        from: '"Forgot password" <netglobaltrello@gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: "Forgot password ✔", // Subject line
        //text: "Hello world?", // plain text body
        html: `
            <b>Hola, ${user.name}:</b>
            <br/>
            <b>Hemos recibido una solicitud para restablecer la contraseña de tu cuenta de Securitynet.</b>
            <br/>
            <b>${randomcode}</b>
            <b>Introduce este código para restablecerla.</b>
            <b>Gracias por ayudarnos a mantener tu cuenta segura.</b>
            <br/>
            <b>El equipo de Securitynet</b>
            `, // html body
      }); //hacer un update del ususario con el valor de ese codigo
      res.send({ message, info: emailStatus });
    } catch (error) {
      console.log(error);
      res.status(400).send("algo salio mal");
    }
  }

  static async createNewPassword(req, res) {
    const newPassword = req.body.newPassword;
    const email = req.body.email;
    // console.log("newpass, token", newPassword, resetToken);

    try {
      const user = await SecurityGuard.findOne({
        where: { email: email },
      });
      console.log("usseeer", user);
      console.log("user props", newPassword, user.salt);
      const hashedPass = await user.hash(newPassword, user.salt);
      //console.log('hasheddd pass', hashedPass)

      const updated = await user.update({
        password: hashedPass,
        reseted: true,
      });
      //console.log('updated', updated)

      res.send("password modificado con exito");
    } catch {
      return res.status(401).send("algo salio mal");
    }
  }

  static async verify(req, res) {
    try {
      //recibimos por req.body el codigo que recibio el guardia por email
      const codemail = req.body.code;
      //buscar el guardia
      let guard = await SecurityGuard.findByPk(req.params.id);
      const { code } = guard;

      console.log("este el el code", code);
      console.log("este es el codemail", codemail);

      if (code === codemail) {
        guard = await guard.update({ code: null });
        return res.send(true);
      } else {
        return res.send(false);
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  }
}

module.exports = Guardcontroller;
