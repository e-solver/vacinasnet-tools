const validator = require("joi");
const addressSchema = require("./addressSchema")(validator);
const timeFormatSchema = require("./timeFormatSchema")(validator);
const businessHoursSchema = require("./businessHoursSchema")(
  validator,
  timeFormatSchema
);

module.exports = { timeFormatSchema, businessHoursSchema, addressSchema };
