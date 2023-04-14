const dockApi = require("./dock/dockApi");
const shippingPolicyApi = require("./shippingPolicy/shippingPolicyApi");
const freightValuesApi = require("./freightValues/freightValuesApi");
const storeApi = require("./masterData/storeApi");
const pickupPointApi = require("./pickupPoint/pickupPointApi");
const warehouseApi = require("./warehouse/warehouseApi");

module.exports = {
  dockApi,
  shippingPolicyApi,
  freightValuesApi,
  storeApi,
  pickupPointApi,
  warehouseApi,
};
