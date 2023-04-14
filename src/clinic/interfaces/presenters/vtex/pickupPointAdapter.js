module.exports = makePickupPoint = (vtexId) => (clinicInfo) => {
  const { name, cnpj, address, businessHours } = clinicInfo;

  const {
    postalCode,
    street,
    number,
    complement,
    reference,
    neighborhood,
    city,
    state,
    latitude,
    longitude,
  } = address;

  const id = vtexId({ name, city, state }, "pickupPoint");

  const vtexAddressObj = {
    postalCode: `${postalCode}`,
    country: { acronym: "BRA", name: "Brazil" },
    city,
    state,
    neighborhood,
    street,
    number: `${number}`,
    complement,
    reference,
    location: { latitude, longitude },
  };

  const vtexBusinessHoursObj = businessHours.map(
    ({ dayOfWeek, activeTime }) => ({
      dayOfWeek,
      openingTime: activeTime[0],
      closingTime: activeTime[1],
    })
  );

  return Object.freeze({
    id,
    name: `Clínica ${name} ${city}`,
    description: cnpj,
    instructions:
      "Para efetuar a vacinação na clínica, apresente na recepção o email de confirmação do pagamento.",
    formatted_address: "undefined",
    address: vtexAddressObj,
    isActive: true,
    businessHours: vtexBusinessHoursObj,
    tagsLabel: [],
  });
};
