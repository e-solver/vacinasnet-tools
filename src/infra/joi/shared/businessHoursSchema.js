module.exports = buildBusinessHoursSchema = (validator, timeFormat) =>
  validator
    .array()
    .items(
      validator.object({
        dayOfWeek: validator.number().min(0).max(6).required(),
        openingTime: timeFormat,
        closingTime: timeFormat,
      })
    )
    .default([
      {
        dayOfWeek: 0,
        openingTime: "00:00:00",
        closingTime: "23:59:59",
      },
      {
        dayOfWeek: 1,
        openingTime: "00:00:00",
        closingTime: "23:59:59",
      },
      {
        dayOfWeek: 2,
        openingTime: "00:00:00",
        closingTime: "23:59:59",
      },
      {
        dayOfWeek: 3,
        openingTime: "00:00:00",
        closingTime: "23:59:59",
      },
      {
        dayOfWeek: 4,
        openingTime: "00:00:00",
        closingTime: "23:59:59",
      },
      {
        dayOfWeek: 5,
        openingTime: "00:00:00",
        closingTime: "23:59:59",
      },
      {
        dayOfWeek: 6,
        openingTime: "00:00:00",
        closingTime: "23:59:59",
      },
    ]);
