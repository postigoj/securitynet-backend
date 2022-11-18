const { Admin } = require("../models");
const { generateToken, validateToken } = require("../config/token");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const transporter = require("../config/mailer");

class Admincontroller {
  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({
        where: { email },
      });
      if (!admin) return res.sendStatus(401);
      const isValid = await admin.validatePassword(password);
      if (!isValid) return res.sendStatus(401);

      const payload = {
        email: admin.email,
        name: admin.name,
        role: admin.role,
        id: admin.id,
      };

      const token = generateToken(payload);

      return res.cookie("admin", token).send(payload);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async register(req, res) {
    try {
      const { name, email, role, password } = req.body;
      await Admin.create({
        //crea el admin
        name: name,
        email: email,
        role: role,
        password: password,
      });

      const allAdmin = await Admin.findAll(); //luego devuelve todos los admins
      return res.status(201).send(allAdmin);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async editAdmin(req, res) {
    try {
      const adminId = req.params.id;
      await Admin.update(req.body, { where: { id: adminId } });
      const allAdmin = await Admin.findAll();
      return res.status(201).send(allAdmin);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async deleteAdmin(req, res) {
    try {
      const adminId = req.params.id;
      await Admin.destroy({ where: { id: adminId } });
      const allAdmin = await Admin.findAll();
      return res.send(allAdmin);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async allAdmin(req, res) {
    try {
      const allAdmin = await Admin.findAll();
      return res.status(200).send(allAdmin);
    } catch (error) {
      res.status(500).send(error);
    }
  }

  static async logout(req, res) {
    try {
      return res.clearCookie("admin").sendStatus(204);
    } catch (error) {
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
      const user = await Admin.findOne({ where: { email } });
      if (!user) return res.status(400).send("No se encontro un usuario");
      const token = jwt.sign(
        { userID: user.id, userEmail: user.email },
        process.env.SECRET,
        { expiresIn: "40m" }
      );
      //console.log("token", token);
      verificationLink = `http://localhost:3000/reset/${token}`;
      const updated = await user.update({ resetToken: token });

      // send mail with defined transport object
      await transporter.sendMail({
        from: '"Forgot password" <netglobaltrello@gmail.com>', // sender address
        to: user.email, // list of receivers
        subject: "Forgot password ✔", // Subject line
        //text: "Hello world?", // plain text body
        html: `
            <b>porfavor clickee en el siguiente link para restablecer la contraseña</b>
            <br/>
            <a href='${verificationLink}'>${verificationLink}</a>
            `, // html body
      });
      res.send({ message, info: emailStatus });
    } catch {
      res.status(400).send("algo salio mal");
    }
  }

  static async createNewPassword(req, res) {
    const newPassword = req.body.newPassword;
    const resetToken = req.body.token;
    //console.log('newpass, token', newPassword, resetToken)

    if (!(newPassword && resetToken))
      return res.status(400).send("todos los campos son obligatorios");

    let jwtPayload;

    try {
      //console.log("prueba1");
      jwtPayload = jwt.verify(resetToken, process.env.SECRET);
      //console.log("jwtpayloaaaaaaaad", jwtPayload);
      const user = await Admin.findOne({
        where: { email: jwtPayload.userEmail },
      });
      //console.log("usser", user);
      //console.log('user props', newPassword, user.salt)
      const hashedPass = await user.hash(newPassword, user.salt);
      //console.log('hasheddd pass', hashedPass)

      const updated = await user.update({ password: hashedPass });
      //console.log('updated', updated)

      res.send("password modificado con exito");
    } catch {
      return res.status(401).send("algo salio mal");
    }
  }
}

module.exports = Admincontroller;
