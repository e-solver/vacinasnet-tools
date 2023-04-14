module.exports = buildStoreSchema =
  (validator, addressSchema) => (storeInfo) => {
    const {
      city,
      state,
      complement,
      neighborhood,
      street,
      postalCode,
      number,
    } = addressSchema;

    const schema = validator
      .object({
        name: validator.string().required(),
        city,
        longitude: validator.string().required(),
        latitude: validator.string().required(),
        state,
        complement,
        neighborhood,
        imgloja: validator.string().optional().allow(""),
        address: street,
        postalCode,
        number,
        country: validator.string().default("Brasil"),
      })
      .required();

    const { value: result, error } = schema.validate(storeInfo);
    if (error) throw error;
    return result;
  };
