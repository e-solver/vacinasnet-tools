const jennerAddressSchema = (addressSchema) => {
  const {
    postalCode: zipCode,
    city,
    state,
    neighborhood,
    street: streetName,
    number: streetNumber,
    complement,
  } = addressSchema;

  return {
    city,
    state,
    zipCode,
    neighborhood,
    streetName,
    streetNumber,
    complement,
  };
};

const managerDataSchema = (validator) => ({
  name: validator.string().required(),
  responsibility: validator.string().required(),
  phone: validator.string().alphanum().required(),
  email: validator.string().email().required(),
});

const bankAccountSchema = (validator) => ({
  bankName: validator.string().required(),
  account: validator.string().required(),
  agency: validator.string().required(),
});

const financialGroupDataSchema = (validator) =>
  validator
    .object({
      ...managerDataSchema(validator),
      bankAccount: validator.object(bankAccountSchema(validator)).required(),
    })
    .required();

const externalDataSchema = (validator) =>
  validator
    .object({
      vtex: {
        warehouseId: validator.string().required(),
        slasIds: validator
          .array()
          .items(validator.string().required())
          .required(),
      },
    })
    .required();

const clinicGroupSchema = (validator) =>
  validator
    .object({
      _id: validator.string().required(),
    })
    .required();

module.exports = buildJennerClinicSchema =
  (validator, addressSchema) => (clinicInfo) => {
    const schema = validator
      .object({
        cnpj: validator.string().alphanum().required(),
        companyName: validator.string().required(),
        name: validator.string().required(),
        address: validator
          .object(jennerAddressSchema(addressSchema))
          .required(),
        phone: validator.string().alphanum().required(),
        website: validator.string().optional().allow(""),
        managerData: validator.object(managerDataSchema(validator)).required(),
        financialGroupData: financialGroupDataSchema(validator),
        externalData: externalDataSchema(validator),
        clinicGroup: clinicGroupSchema(validator),
      })
      .required();

    const { value: result, error } = schema.validate(clinicInfo);
    if (error) throw error;
    return result;
  };
