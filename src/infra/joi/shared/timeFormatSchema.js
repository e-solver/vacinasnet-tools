module.exports = buildTimeFormatSchema = (validator) =>
  validator
    .string()
    .regex(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/)
    .required();
