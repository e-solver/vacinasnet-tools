module.exports = makeWarehouse = (vtexId) => (clinicInfo) => {
  const { name, address } = clinicInfo;
  const { city, state } = address;

  const id = vtexId({ name, city, state }, "warehouse");
  const dockId = vtexId({ name, city, state }, "vclin");
  const warehouseName = `Estoque XXXX ${name} - ${city}`;

  return Object.freeze({
    id,
    name: warehouseName,
    warehouseDocks: [
      {
        dockId,
        name: `VCLIN ${name}`,
        time: "00:00:00",
        cost: "0",
        translateDays: "dias",
        costToDisplay: "0",
      },
    ],
  });
};
