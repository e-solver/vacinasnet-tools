const makeClinic = require("../entity/");

module.exports = addClinic = (clinicInfo) => {
  const clinic = makeClinic(clinicInfo);

  return clinic;
};
