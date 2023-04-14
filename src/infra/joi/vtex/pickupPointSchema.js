const locationSchema = (validator) => ({
  latitude: validator.number().required(),
  longitude: validator.number().required(),
});

module.exports = buildPickupPointSchema =
  (validator, addressSchema, businessHoursSchema) => (pickupPointInfo) => {
    const schema = validator
      .object({
        id: validator.string().required(),
        name: validator.string().required(),
        description: validator.string().optional().allow(""),
        instructions: validator.string().optional().allow(""),
        formatted_address: validator.string().default("undefined"),
        isActive: validator.boolean().default(true),
        address: validator
          .object({ ...addressSchema, location: locationSchema(validator) })
          .required(),
        businessHours: businessHoursSchema,
        tagsLabel: validator.array().items(validator.string()).default([""]),
      })
      .required();

    const { value: result, error } = schema.validate(pickupPointInfo);
    if (error) throw error;
    return result;
  };
