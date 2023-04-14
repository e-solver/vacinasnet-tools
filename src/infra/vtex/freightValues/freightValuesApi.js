require("dotenv").config;
const axios = require("axios");
const vtexAuthInfo = require("../utils");
const vtexURI = process.env.VTEX_API_URI;

const { freightValuesSchema } = require("../../joi/vtex");

const createFreightValues = async (freightValuesInfo, carrierId) => {
  const validatedFreightValues = freightValuesSchema(freightValuesInfo);
  const freightValuesApiUrl = `${vtexURI}/api/logistics/pvt/configuration/freights/${carrierId}/values/update`;

  const { data } = await axios.post(
    freightValuesApiUrl,
    validatedFreightValues,
    { headers: vtexAuthInfo() }
  );

  return { ...data, ...validatedFreightValues };
};

module.exports = { createFreightValues };
