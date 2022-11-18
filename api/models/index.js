const Admin = require("./Admin");
const BranchOffice = require("./BranchOffice");
const Event = require("./Event");
const Client = require("./Client");
const Province = require("./Province");
const SecurityGuard = require("./SecurityGuard");
const Report=require("./Report");

//relacion entre la tabla SecurytyGuard y Event
Event.belongsTo(SecurityGuard);
SecurityGuard.hasMany(Event, {
  as: "guardEvent",
});

//relacion entre la tabla BranchOffice y eventos
BranchOffice.hasMany(Event, { as: "branchOfficeEvent" });
Event.belongsTo(BranchOffice);

// //relacion entre la tabla BranchOffice y Client---- esta relacion sirve para que traiga el arreglo de sucursales en caso de querer consultar las sucursales que tenga cada cliente
Client.hasMany(BranchOffice, { as: "clientbranchoffice" });
BranchOffice.belongsTo(Client);

// //relacion entre la tabla BranchOffice y Province
Province.hasMany(BranchOffice, { as: "provincebranchoffice" });
BranchOffice.belongsTo(Province);

//relacion entre las tablas de provincias con los guardias de seguridad
Province.hasMany(SecurityGuard, { as: "provincesecurityguard" });
SecurityGuard.belongsTo(Province);

//relacion de una sucursal tiene muchos guardias
BranchOffice.belongsToMany(SecurityGuard, {
  as: "guardbranchoffice",
  through: "securityguard_branchoffice",
});
SecurityGuard.belongsToMany(BranchOffice, {
  as: "guardbranchoffice",
  through: "securityguard_branchoffice",
});

//relacion entre el modelo de securityguard con report
Report.belongsTo(SecurityGuard)
SecurityGuard.hasMany(Report,{as:"guardsreport" })

module.exports = {
  Admin,
  BranchOffice,
  Event,
  Client,
  Province,
  SecurityGuard,
  Report,
};
