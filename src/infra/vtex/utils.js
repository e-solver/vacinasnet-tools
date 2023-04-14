require("dotenv").config();
const vtexAppKey = process.env.VTEX_APP_KEY;
const vtexAppToken = process.env.VTEX_APP_TOKEN;

module.exports = vtexAuthInfo = () => ({
  "X-VTEX-API-AppKey": vtexAppKey,
  "X-VTEX-API-AppToken": vtexAppToken,
});
