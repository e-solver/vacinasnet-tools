require("dotenv").config;
const axios = require("axios");
const axiosRetry = require("axios-retry");
const vtexAuthInfo = require("../utils");
const vtexURI = process.env.VTEX_API_URI;

const { shippingPolicySchema } = require("../../joi/vtex");

axiosRetry(axios, {
  retries: 20,
  retryDelay: (retryCount) => console.log("retry attempt: " + retryCount),
  retryCondition: (error) => error.response.status == 500,
});

const createShippingPolicy = async (shippingPolicyInfo) => {
  const validatedShippingPolicy = shippingPolicySchema(shippingPolicyInfo);
  const shippingPolicyApiUrl = `${vtexURI}/api/logistics/pvt/shipping-policies`;

  return await axios
    .post(shippingPolicyApiUrl, validatedShippingPolicy, {
      headers: vtexAuthInfo(),
    })
    .then((result) => result.data);
};

module.exports = { createShippingPolicy };
