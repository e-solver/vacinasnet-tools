// schema test
const fakeWarehouse = require("./__test__/fakeWarehouse.json");
const { warehouseSchema } = require("../../joi/vtex/");

// adapter test
const fakeClinic = require("../../../clinic/entity/__test__/fakeClinic");
const fakeWarehouseFromFakeClinic = require("./__test__/fakeWarehouseFromFakeClinic");
const { makeWarehouse } = require("../../../clinic/interfaces/presenters/vtex");

// infra utils
const warehouseList = require("./__test__/warehouseList.json");
const { getLatestWarehouseNumberFromList } = require("./warehouseApi");

describe("Warehouse payload:", () => {
  it("must validate and return the request object", () => {
    const obj = fakeWarehouse;
    expect(warehouseSchema(obj)).toEqual(obj);
  });
});

describe("Warehouse payload from adapter", () => {
  it("must validate and return the request object", () => {
    const obj = makeWarehouse(fakeClinic());
    expect(warehouseSchema(obj)).toEqual(fakeWarehouseFromFakeClinic);
  });
});

describe("Return latest stock", () => {
  it("must return the number of the latest stock", () => {
    const warehouseNumber = getLatestWarehouseNumberFromList(warehouseList);
    expect(warehouseNumber).toBe(29);
  });
});
