// schema test
const fakeDock = require("./__test__/fakeDock.json");
const { dockSchema } = require("../../joi/vtex");

// adapter test
const fakeClinic = require("../../../clinic/entity/__test__/fakeClinic");
const fakeDockFromFakeClinic = require("./__test__/fakeDockFromFakeClinic");
const { makeDock } = require("../../../clinic/interfaces/presenters/vtex");

describe("Fake dock payload:", () => {
  it("must validate and return the request object", () => {
    const obj = fakeDock;
    expect(dockSchema(obj)).toEqual(obj);
  });
});

describe("Dock payload from adapter", () => {
  it("must validate and return the request object", () => {
    const obj = makeDock(fakeClinic());
    expect(dockSchema(obj)).toEqual(fakeDockFromFakeClinic);
  });
});
