const validator = require("joi");
const { addressSchema } = require("../shared");

const jennerClinicSchema = require("./clinicSchema")(validator, addressSchema);
const userSchema = require("./userSchema")(validator);

module.exports = { jennerClinicSchema, userSchema };
