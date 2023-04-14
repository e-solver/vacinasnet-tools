const defaultCarrierBusinessHours = () => {
  let arr = [];

  for (let i = 0; i <= 6; i++) {
    arr.push({
      dayOfWeek: i,
      openingTime: "00:00:00",
      closingTime: "23:59:59",
    });
  }

  return arr;
};

const strToMs = (str) => {
  return new Date(`December 31, ${str}`).getTime();
};

const msToStr = (ms) => {
  return new Date(ms)
    .toLocaleTimeString("pt-BR", { hour12: false })
    .split(" ")[0];
};

const calculateMaxCapacity = (startTime, endTime) => {
  // TO-DO: setup better calculation
  return strToMs(endTime) - strToMs(startTime) == 6 * 60 * 10000 ? 4 : 2;
};

const createTimeRanges = (businessHours) => {
  const [startMs, endMs] = businessHours.map(strToMs);
  const interval = 6 * 60 * 10000;
  let arr = [];

  for (
    let currentTime = startMs;
    currentTime < endMs;
    currentTime += interval
  ) {
    if (currentTime + interval <= endMs) {
      arr.push([msToStr(currentTime), msToStr(currentTime + interval)]);
    } else {
      arr.push([msToStr(currentTime), msToStr(endMs)]);
    }
  }

  return arr;
};

const createDeliveryRanges = (activeTime, breakTime) => {
  // TO-DO: think of need to refactor
  const setObj = ([startTime, endTime]) => ({
    startTime,
    endTime,
    listPrice: 0,
    deliveryCapacity: [
      {
        capacityType: "ORDERS_QUANTITY",
        maxValue: calculateMaxCapacity(startTime, endTime),
      },
    ],
  });

  if (breakTime) {
    const [activeStart, activeEnd, breakStart, breakEnd] = [
      ...activeTime,
      ...breakTime,
    ];
    return [
      ...createTimeRanges([activeStart, breakStart]).map(setObj),
      ...createTimeRanges([breakEnd, activeEnd]).map(setObj),
    ];
  }

  return [...createTimeRanges(activeTime).map(setObj)];
};

const createDayOfWeekForDelivery = ({ dayOfWeek, activeTime, breakTime }) => ({
  dayOfWeek,
  deliveryRanges: createDeliveryRanges(activeTime, breakTime),
});

module.exports = makeShippingPolicy = (vtexId) => (clinicInfo) => {
  const {
    businessHours,
    name,
    address: { city, state },
  } = clinicInfo;

  const id = vtexId({ name, city, state }, "vclin");
  const pickupPointId = vtexId({ name, city, state }, "pickupPoint");

  const worksOnDay = (dayNumber) =>
    !!businessHours.find(({ dayOfWeek }) => dayOfWeek == dayNumber);

  const dayOfWeekForDelivery = businessHours.map(createDayOfWeekForDelivery);

  return Object.freeze({
    id,
    name: `VCLIN ${name} ${city}`,
    shippingMethod: `Atendimento na Clínica ${name} - ${city}`,
    weekendAndHolidays: {
      saturday: worksOnDay(6),
      sunday: worksOnDay(0),
      holiday: false,
    },
    maxDimension: {
      largestMeasure: 0,
      maxMeasureSum: 0,
    },
    numberOfItemsPerShipment: 1,
    minimumValueAceptable: 0,
    maximumValueAceptable: 0,
    deliveryScheduleSettings: {
      useDeliverySchedule: true,
      dayOfWeekForDelivery,
      maxRangeDelivery: 60,
    },
    carrierSchedule: [],
    cubicWeightSettings: {
      volumetricFactor: 0,
      minimunAcceptableVolumetricWeight: 0,
    },
    modalSettings: {
      modals: [],
      useOnlyItemsWithDefinedModal: false,
    },
    businessHourSettings: {
      carrierBusinessHours: defaultCarrierBusinessHours(),
      isOpenOutsideBusinessHours: true,
    },
    pickupPointsSettings: {
      pickupPointIds: [pickupPointId],
      pickupPointTags: [],
      sellers: [],
    },
    isActive: true,
  });
};
