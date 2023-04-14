require("dotenv").config;
const axios = require("axios");
const vtexAuthInfo = require("../utils");
const vtexURI = process.env.VTEX_API_URI;

const { warehouseSchema } = require("../../joi/vtex");

const createWarehouse = async (warehouseInfo) => {
  const validatedWarehouse = warehouseSchema(warehouseInfo);
  const latestWarehouseNumber = await getLatestWarehouseNumberFromList();

  // TO-DO: better handle the number insertion, of course
  const { id, name } = validatedWarehouse;
  const fixedId = id.replace("XXXX", latestWarehouseNumber + 1);
  const fixedName = name.replace("XXXX", latestWarehouseNumber + 1);
  const overrides = { id: fixedId, name: fixedName };

  const updatedWarehouse = { ...validatedWarehouse, ...overrides };

  const warehouseApiUrl = `${vtexURI}/api/logistics/pvt/configuration/warehouses`;

  const { data } = await axios.post(warehouseApiUrl, updatedWarehouse, {
    headers: vtexAuthInfo(),
  });
  return { ...data, ...updatedWarehouse };
};

const getWarehouseList = async () => {
  const warehouseApiUrl = `${vtexURI}/api/logistics/pvt/configuration/warehouses`;
  const { data } = await axios.get(warehouseApiUrl, {
    headers: vtexAuthInfo(),
  });

  return data;
};

const getLatestWarehouseNumberFromList = async () => {
  const warehouseList = await getWarehouseList();

  const idNumberPart = (warehouse) => {
    const splitted = warehouse.id.split("_")[1];
    return +splitted ? +splitted : 1;
  };

  return +idNumberPart(
    warehouseList.reduce((higher, current) =>
      idNumberPart(higher) > idNumberPart(current) ? higher : current
    )
  );
};

module.exports = { createWarehouse, getLatestWarehouseNumberFromList };
