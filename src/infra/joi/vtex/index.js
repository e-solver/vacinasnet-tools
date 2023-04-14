const validator = require("joi");
const {
  businessHoursSchema,
  addressSchema,
  timeFormatSchema,
} = require("../shared");

const freightValuesSchema = require("./freightValuesSchema")(validator);
const dockSchema = require("./dockSchema")(validator, addressSchema);
const pickupPointSchema = require("./pickupPointSchema")(
  validator,
  addressSchema,
  businessHoursSchema
);
const shippingPolicySchema = require("./shippingPolicySchema")(
  validator,
  businessHoursSchema,
  timeFormatSchema
);
const storeSchema = require("./storeSchema")(validator, addressSchema);
const warehouseSchema = require("./warehouseSchema")(validator);
// TO-DO export

module.exports = {
  freightValuesSchema,
  dockSchema,
  pickupPointSchema,
  shippingPolicySchema,
  storeSchema,
  warehouseSchema,
};
