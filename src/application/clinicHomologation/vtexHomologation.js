const {
  makeDock,
  makeStore,
  makeFreightValues,
  makePickupPoint,
  makeShippingPolicy,
  makeWarehouse,
} = require("../../clinic/interfaces/presenters/vtex");

const {
  dockApi,
  freightValuesApi,
  storeApi,
  pickupPointApi,
  shippingPolicyApi,
  warehouseApi,
} = require("../../infra/vtex");

const vtexHomologation = async (clinic) => {
  const pickupPoint = await pickupPointApi.createPickupPoint(
    makePickupPoint(clinic)
  );
  const shippingPolicy = await shippingPolicyApi.createShippingPolicy(
    makeShippingPolicy(clinic)
  );

  const { id: carrierId } = shippingPolicy;

  const dock = await dockApi.createDock(makeDock(clinic));

  const freightValues = await freightValuesApi.createFreightValues(
    makeFreightValues(clinic),
    carrierId
  );
  const warehouse = await warehouseApi.createWarehouse(makeWarehouse(clinic));
  const store = await storeApi.createStore(makeStore(clinic));

  return Object.freeze({
    dock,
    freightValues,
    store,
    pickupPoint,
    shippingPolicy,
    warehouse,
  });
};

export default vtexHomologation;
