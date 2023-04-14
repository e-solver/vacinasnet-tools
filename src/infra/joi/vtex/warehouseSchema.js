const warehouseDocksSchema = (validator) =>
  validator
    .array()
    .items(
      validator
        .object({
          dockId: validator.string().required(),
          name: validator.string().required(),
          time: validator.string().default("00:00:00"),
          cost: validator.string().default("0"),
          translateDays: validator.string().default("dias"),
          costToDisplay: validator.string().default("0"),
        })
        .required()
    )
    .required();

module.exports = buildWarehouseSchema = (validator) => (warehouseInfo) => {
  const schema = validator
    .object({
      id: validator.string().required(),
      name: validator.string().required(),
      warehouseDocks: warehouseDocksSchema(validator),
    })
    .required();

  const { value: result, error } = schema.validate(warehouseInfo);
  if (error) throw error;
  return result;
};
