require("dotenv").config;
const axios = require("axios");
const vtexAuthInfo = require("../utils");
const vtexURI = process.env.VTEX_API_URI;

const { storeSchema } = require("../../joi/vtex");

const createStore = async (storeInfo) => {
  const validatedStore = storeSchema(storeInfo);
  const acronym = "SO";
  const storeApiUrl = `${vtexURI}/api/dataentities/${acronym}/documents`;
  const { data } = await axios.post(storeApiUrl, validatedStore, {
    headers: vtexAuthInfo(),
  });

  return { ...data, ...validatedStore };
};

module.exports = { createStore };
