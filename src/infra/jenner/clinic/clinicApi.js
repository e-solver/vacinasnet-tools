require("dotenv").config;
const axios = require("axios");
const jennerAuthInfo = require("../utils");
const jennerURI = process.env.JENNER_API_URI;

const { jennerClinicSchema } = require("../../joi/jenner/index");

const createJennerClinic = async (clinicInfo) => {
  const validatedJennerClinic = jennerClinicSchema(clinicInfo);
  const clinicApiUrl = `${jennerURI}/clinic`;
  const { data } = await axios.post(clinicApiUrl, validatedJennerClinic, {
    headers: jennerAuthInfo(),
  });

  return data;
};

const getClinicGroup = async (clinicGroupName) => {
  const clinicGroupApiUrl = `${jennerURI}/clinic-group?limit=25&name=%25${clinicGroupName}%25&page=0&sort=name&sortOrder=asc`;
  const { data } = await axios.get(clinicGroupApiUrl, {
    headers: jennerAuthInfo(),
  });

  return data.results[0];
};

const createClinicGroup = async (clinicGroupName) => {
  const clinicGroupApiUrl = `${jennerURI}/clinic-group`;
  const { data } = await axios.post(
    clinicGroupApiUrl,
    { name: clinicGroupName },
    {
      headers: jennerAuthInfo(),
    }
  );

  return data;
};

const handleClinicGroup = async (clinicGroupName) => {
  const clinicGroup = await getClinicGroup(clinicGroupName);
  const isGroupExistent = !!clinicGroup;

  if (!isGroupExistent) {
    return await createClinicGroup(clinicGroupName);
  }

  return await clinicGroup;
};

module.exports = { createJennerClinic, handleClinicGroup };
