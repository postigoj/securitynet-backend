const { validateToken } = require("../config/token");


const validateAuthsecurityguard = (req, res, next) => {
  const token = req.headers.token;
  //console.log(token)
  if (!token) return res.sendStatus(401);

  const {user} = validateToken(token);
  if (!user) return res.sendStatus(401);

  req.user = user;

  next();
};


module.exports= validateAuthsecurityguard;