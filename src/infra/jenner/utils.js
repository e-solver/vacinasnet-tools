require("dotenv").config();
const jennerToken = process.env.JENNER_TOKEN;

module.exports = jennerAuthInfo = () => ({
  authorization: `Bearer ${jennerToken}`,
});
