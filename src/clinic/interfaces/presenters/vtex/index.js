const makeVtexId = require("./utils/vtexId");
const makeZipCodeIntervals = require("./utils/zipCodeIntervals");

const makeDock = require("./dockAdapter")(makeVtexId);
const makeFreightValues = require("./freightValuesAdapter")(
  makeZipCodeIntervals
);
const makePickupPoint = require("./pickupPointAdapter")(makeVtexId);
const makeWarehouse = require("./warehouseAdapter")(makeVtexId);
const makeShippingPolicy = require("./shippingPolicyAdapter")(makeVtexId);
const makeStore = require("./storeAdapter");

module.exports = {
  makeDock,
  makeFreightValues,
  makePickupPoint,
  makeShippingPolicy,
  makeWarehouse,
  makeStore,
};
