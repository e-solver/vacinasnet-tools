const salesChannelsSchema = (validator) =>
  validator.array().items(validator.string().required()).required();

const freightTableIdsSchema = (validator) =>
  validator.array().items(validator.string());

const coordinatesSchema = (validator) =>
  validator
    .array()
    .items(
      validator
        .array()
        .items(validator.number().required(), validator.number().required())
    )
    .required();

module.exports = buildDockSchema = (validator, addressSchema) => (dockInfo) => {
  const schema = validator.object({
    id: validator.string().required(),
    name: validator.string().required(),
    priority: validator.number().default("0"),
    dockTimeFake: validator.string().default("00:00:00"),
    timeFakeOverhead: validator.string().default("00:00:00"),
    salesChannels: salesChannelsSchema(validator),
    salesChannel: validator.string().optional().allow(null).default(null),
    freightTableIds: freightTableIdsSchema(validator),
    wmsEndPoint: validator.string().optional().allow(""),
    address: validator
      .object({ ...addressSchema, coordinates: coordinatesSchema(validator) })
      .required(),
  });

  const { value: result, error } = schema.validate(dockInfo);
  if (error) throw error;
  return result;
};
