module.exports = makeUser = (clinicInfo, jennerInfo) => {
  const { managerData } = clinicInfo;
  const { name, email } = managerData;
  const { relatedClinics } = jennerInfo;

  return Object.freeze({
    name,
    email,
    roles: ["clinic_admin"],
    relatedClinics,
  });
};
