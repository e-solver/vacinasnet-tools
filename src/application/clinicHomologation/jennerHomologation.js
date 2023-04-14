const { clinicApi, userApi } = require("../../infra/jenner");
const {
  makeJennerClinic,
  makeUser,
} = require("../../clinic/interfaces/presenters/jenner");

const jennerHomologation = async (clinic, vtexInfo) => {
  const { clinicGroupName } = clinic;

  const { _id: clinicGroupId } = await clinicApi.handleClinicGroup(
    clinicGroupName
  );

  const jennerClinic = await clinicApi.createJennerClinic(
    makeJennerClinic(clinic, vtexInfo, { clinicGroupId })
  );

  const { _id } = jennerClinic;

  const user = await userApi.handleUser(
    makeUser(clinic, { relatedClinics: [{ _id }] })
  );

  return Object.freeze({
    jennerClinic,
    user,
  });
};

export default jennerHomologation;
