// schema test
const fakeStore = require("./__test__/fakeStore.json");
const { storeSchema } = require("../../joi/vtex/");

// adapter test
const fakeClinic = require("../../../clinic/entity/__test__/fakeClinic");
const fakeStoreFromFakeClinic = require("./__test__/fakeStoreFromFakeClinic");
const { makeStore } = require("../../../clinic/interfaces/presenters/vtex");

describe("Master Data Store payload:", () => {
  it("must validate and return the request object", () => {
    const obj = fakeStore;
    expect(storeSchema(obj)).toEqual(obj);
  });
});

describe("Master Data Store payload from adapter", () => {
  it("must validate and return the request object", () => {
    const obj = makeStore(fakeClinic());
    expect(storeSchema(obj)).toEqual(fakeStoreFromFakeClinic);
  });
});
