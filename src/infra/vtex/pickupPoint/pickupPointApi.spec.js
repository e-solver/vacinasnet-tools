// schema test
const fakePickupPoint = require("./__test__/fakePickupPoint.json");
const { pickupPointSchema } = require("../../joi/vtex/");

// adapter test
const fakeClinic = require("../../../clinic/entity/__test__/fakeClinic");
const fakePickupPointFromFakeClinic = require("./__test__/fakePickupPointFromFakeClinic");
const {
  makePickupPoint,
} = require("../../../clinic/interfaces/presenters/vtex");

describe("Pickup point payload:", () => {
  it("must validate and return the request object", () => {
    const obj = fakePickupPoint;
    expect(pickupPointSchema(obj)).toEqual(obj);
  });
});

describe("Pickup point payload from adapter", () => {
  it("must validate and return the request object", () => {
    const obj = makePickupPoint(fakeClinic());
    expect(pickupPointSchema(obj)).toEqual(fakePickupPointFromFakeClinic);
  });
});
