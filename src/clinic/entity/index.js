const { validator } = require("../../utils");

const makeClinicObjectProps = require("./clinicObjectProps");
const buildMakeClinic = require("./Clinic");

const makeClinic = buildMakeClinic(makeClinicObjectProps, validator);

module.exports = makeClinic;
