module.exports = makeFreightValues = (zipCodeIntervals) => (clinicInfo) => {
  const {
    address: { state },
  } = clinicInfo;

  const zipCodeInterval = zipCodeIntervals(state);

  return zipCodeInterval.map(([zipCodeStart, zipCodeEnd]) => ({
    absoluteMoneyCost: "0",
    country: "BRA",
    maxVolume: 100000000,
    operationType: 1,
    pricePercent: 0,
    pricePercentByWeight: 0,
    timeCost: "00:00:00",
    weightEnd: 100000,
    weightStart: 0,
    zipCodeEnd,
    zipCodeStart,
    polygon: "",
  }));
};
