const countrySchema = (validator) =>
  validator
    .object({
      acronym: validator.string().required(),
      name: validator.string().required(),
    })
    .default({ acronym: "BRA", name: "Brazil" });

module.exports = buildAddressSchema = (validator) => ({
  postalCode: validator
    .alternatives()
    .try(
      validator.string().regex(/^[0-9]{5}-[0-9]{3}$/),
      validator.string().alphanum().length(8)
    )
    .required(),
  country: countrySchema(validator),
  city: validator.string().required(),
  state: validator.string().required(),
  neighborhood: validator.string().required(),
  street: validator.string().required(),
  number: validator.string().optional().allow(""),
  complement: validator.string().optional().allow(""),
  reference: validator.string().optional().allow(""),
});
