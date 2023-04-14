// schema test
const fakeFreightValues = require("./__test__/fakeFreightValues.json");
const { freightValuesSchema } = require("../../joi/vtex");

// adapter test
const fakeClinic = require("../../../clinic/entity/__test__/fakeClinic");
const {
  fakeFreightValuesFromFakeClinic,
} = require("./__test__/fakeFreightValuesFromFakeClinic");
const {
  makeFreightValues,
} = require("../../../clinic/interfaces/presenters/vtex");

describe("Freight values payload:", () => {
  it("must validate and return the request object", () => {
    const obj = fakeFreightValues;
    expect(freightValuesSchema(obj)).toEqual(obj);
  });
});

describe("Freight values payload from adapter", () => {
  it("must validate and return the request object", () => {
    const obj = makeFreightValues(fakeClinic());
    expect(freightValuesSchema(obj)).toEqual(fakeFreightValuesFromFakeClinic);
  });
});
