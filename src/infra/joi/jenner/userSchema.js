const relatedClinicsSchema = (validator) =>
  validator
    .array()
    .items({
      _id: validator.string().required(),
    })
    .required();

module.exports = buildUserSchema = (validator) => (userInfo) => {
  const schema = validator
    .object({
      name: validator.string().required(),
      email: validator.string().email().required(),
      roles: validator.array().items(validator.string().required()).required(),
      relatedClinics: relatedClinicsSchema(validator),
    })
    .required();

  const { value: result, error } = schema.validate(userInfo);
  if (error) throw error;
  return result;
};
