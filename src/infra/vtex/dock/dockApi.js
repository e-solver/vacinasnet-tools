require("dotenv").config;
const axios = require("axios");
const vtexAuthInfo = require("../utils");
const vtexURI = process.env.VTEX_API_URI;

const { dockSchema } = require("../../joi/vtex");

const createDock = async (dockInfo) => {
  const validatedDock = dockSchema(dockInfo);
  const dockApiUrl = `${vtexURI}/api/logistics/pvt/configuration/docks`;
  const { data } = await axios.post(dockApiUrl, validatedDock, {
    headers: vtexAuthInfo(),
  });

  return { ...data, ...validatedDock };
};

module.exports = { createDock };
