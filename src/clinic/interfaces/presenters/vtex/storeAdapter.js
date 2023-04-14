module.exports = makeStore = (clinicInfo) => {
  const { name, address, thumbnail } = clinicInfo;
  const {
    city,
    longitude,
    latitude,
    state,
    complement,
    neighborhood,
    street,
    country,
    postalCode,
    number,
  } = address;

  return Object.freeze({
    name,
    city,
    longitude: `${longitude}`,
    latitude: `${latitude}`,
    state,
    complement,
    neighborhood,
    imgloja: thumbnail || " ",
    address: street,
    country: country || "Brasil",
    postalCode: `${postalCode}`,
    number: `${number}`,
  });
};
