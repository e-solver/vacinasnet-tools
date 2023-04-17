require("dotenv").config;
const axios = require("axios");
const jennerAuthInfo = require("../utils");
const jennerURI = process.env.JENNER_API_URI;

const { userSchema } = require("../../joi/jenner/index");

const createUser = async (userInfo) => {
  const userApiUrl = `${jennerURI}/user`;
  const { data } = await axios.post(userApiUrl, userInfo, {
    headers: jennerAuthInfo(),
  });

  return data;
};

const getUserByEmail = async (userEmail) => {
  const userApiUrl = `${jennerURI}/user?email=%25${userEmail}%25&limit=1&page=0&sort=name&sortOrder=ASC`;
  const { data } = await axios.get(userApiUrl, { headers: jennerAuthInfo() });

  return data.results[0];
};

const addClinicToUser = async (userInfo, clinicId) => {
  const { _id, relatedClinics, email, roles, name } = userInfo;
  const relatedClinicsIds = relatedClinics.map(({ _id }) => ({
    _id,
  }));

  const userApiUrl = `${jennerURI}/user/${_id}`;
  const userWithAddedClinic = {
    name,
    email,
    roles,
    relatedClinics: [...relatedClinicsIds, { _id: clinicId }],
  };
  const { data } = await axios.patch(userApiUrl, userWithAddedClinic, {
    headers: jennerAuthInfo(),
  });

  return data;
};

const handleUser = async (newUserInfo) => {
  const { email: newUserEmail, relatedClinics: newUserClinic } =
    userSchema(newUserInfo);

  const user = await getUserByEmail(newUserEmail);
  const userExists = user != undefined;

  if (userExists) {
    return await addClinicToUser(user, newUserClinic[0]._id);
  }

  return await createUser(newUserInfo);
};

module.exports = { handleUser };
