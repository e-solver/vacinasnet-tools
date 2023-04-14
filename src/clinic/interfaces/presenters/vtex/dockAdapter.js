module.exports = makeDock = (vtexId) => (clinicInfo) => {
  const { name, address } = clinicInfo;
  const {
    postalCode,
    city,
    state,
    neighborhood,
    number,
    street,
    complement,
    latitude,
    longitude,
  } = address;

  const id = vtexId({ name, city, state }, "vclin");

  return Object.freeze({
    id,
    name: `VCLIN ${name}`,
    priority: 0,
    dockTimeFake: "2.00:00:00",
    timeFakeOverhead: "00:00:00",
    salesChannels: ["1"],
    salesChannel: null,
    freightTableIds: [id],
    wmsEndPoint: "",
    address: {
      postalCode: `${postalCode}`,
      country: { acronym: "BRA", name: "Brazil" },
      city,
      state,
      neighborhood,
      street,
      number: `${number}`,
      complement,
      coordinates: [[latitude, longitude]],
    },
  });
};
