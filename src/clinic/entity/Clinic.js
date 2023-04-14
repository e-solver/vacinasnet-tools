//TO-DO: setup type (Laboratório, Farmácia, Clínica)

module.exports = buildMakeClinic =
  (
    {
      makeClinicBusinessHours,
      makeClinicAddress,
      makeClinicManagerData,
      makeClinicFinancialData,
    },
    validator
  ) =>
  (clinicInfo) => {
    validator.object(clinicInfo, "Clinic info must no be empty");
    const {
      name = "",
      cnpj = "",
      thumbnail = "",
      companyName = "",
      clinicGroupName = "",
      phone = "",
      website = "",
    } = clinicInfo;

    let {
      address = {},
      businessHours = [],
      managerData = {},
      financialData = {},
    } = clinicInfo;

    validator.string(name, "Invalid clinic name:" + name);
    validator.number(cnpj, "Invalid CNPJ: " + cnpj);
    validator.string(companyName, "Invalid company name" + companyName);
    validator.number(phone, "Invalid phone number" + phone);
    validator.string(
      clinicGroupName,
      "Invalid clinic group name" + clinicGroupName
    );
    validator.array(businessHours, "Business hours array must not be empty");
    validator.object(managerData, "Manager data object must not be empty");
    validator.object(address, "Address object must not be empty");
    validator.object(financialData, "Financial data object must not be empty");

    businessHours = makeClinicBusinessHours(businessHours);
    managerData = makeClinicManagerData(managerData);
    address = makeClinicAddress(address);
    financialData = makeClinicFinancialData(financialData);

    return Object.freeze({
      get name() {
        return name;
      },
      get cnpj() {
        return cnpj;
      },
      get thumbnail() {
        return thumbnail;
      },
      get companyName() {
        return companyName;
      },
      get clinicGroupName() {
        return clinicGroupName;
      },
      get address() {
        return address;
      },
      get phone() {
        return phone;
      },
      get website() {
        return website;
      },
      get businessHours() {
        return businessHours;
      },
      get managerData() {
        return managerData;
      },
      get financialData() {
        return financialData;
      },
      // get createdOn() {
      //   return Date.now();
      // },
    });
  };
