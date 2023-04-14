module.exports = buildFreightValuesSchema =
  (validator) => (freightValuesInfo) => {
    const schema = validator
      .array()
      .items(
        validator
          .object({
            absoluteMoneyCost: validator.string().default("0.00"),
            country: validator.string().default("BRA"),
            maxVolume: validator.number().default(100000000),
            operationType: validator.number().default(1),
            pricePercent: validator.number().default(0),
            pricePercentByWeight: validator.number().default(0),
            timeCost: validator.string().default("00:00:00"),
            weightEnd: validator.number().default(100000),
            weightStart: validator.number().default(0),
            zipCodeEnd: validator.string().alphanum().required(),
            zipCodeStart: validator.string().alphanum().required(),
            polygon: validator.string().allow(""),
          })
          .required()
      )
      .required();

    const { value: result, error } = schema.validate(freightValuesInfo);
    if (error) throw error;
    return result;
  };
