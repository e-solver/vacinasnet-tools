module.exports = makeJennerClinic = (clinicInfo, vtexInfo, jennerInfo) => {
  const {
    name,
    cnpj,
    companyName,
    address,
    phone,
    website,
    managerData,
    financialData: financialGroupData,
  } = clinicInfo;

  const {
    city,
    state,
    postalCode: zipCode,
    neighborhood,
    street: streetName,
    number: streetNumber,
    complement,
  } = address;

  const { role: managerResponsibility, ...managerDataProps } = managerData;
  const {
    role: financialResponsibility,
    account,
    agency,
    bankName,
    ...financialDataProps
  } = financialGroupData;

  const { warehouseId, slasIds } = vtexInfo;
  const { clinicGroupId: _id } = jennerInfo;

  return Object.freeze({
    cnpj,
    companyName,
    name: `${name} - ${city} ${state}`,
    address: {
      zipCode,
      city,
      state,
      neighborhood,
      streetName,
      streetNumber: `${streetNumber}`,
      complement,
    },
    phone,
    website,
    managerData: {
      ...managerDataProps,
      responsibility: managerResponsibility,
    },
    financialGroupData: {
      ...financialDataProps,
      responsibility: financialResponsibility,
      bankAccount: {
        account,
        agency,
        bankName,
      },
    },
    externalData: {
      vtex: {
        warehouseId,
        slasIds,
      },
    },
    clinicGroup: { _id },
  });
};
