require("dotenv").config;
const axios = require("axios");
const vtexAuthInfo = require("../utils");
const vtexURI = process.env.VTEX_API_URI;

const { pickupPointSchema } = require("../../joi/vtex");

const createPickupPoint = async (pickupPointInfo) => {
  const validatedPickupPoint = pickupPointSchema(pickupPointInfo);
  const { id } = validatedPickupPoint;
  const pickupPointApiUrl = `${vtexURI}/api/logistics/pvt/configuration/pickuppoints/${id}`;

  const { data } = await axios.put(pickupPointApiUrl, validatedPickupPoint, {
    headers: vtexAuthInfo(),
  });

  return data;
};

module.exports = { createPickupPoint };
