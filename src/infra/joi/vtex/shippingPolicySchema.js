const weekendAndHolidaysSchema = (validator) =>
  validator
    .object({
      saturday: validator.boolean().default(false),
      sunday: validator.boolean().default(false),
      holiday: validator.boolean().default(false),
    })
    .default({ saturday: false, sunday: false, holiday: false });

const maxDimensionSchema = (validator) =>
  validator
    .object({
      largestMeasure: validator.number().default(0),
      maxMeasureSum: validator.number().default(0),
    })
    .default({ largestMeasure: 0, maxMeasureSum: 0 });

const deliveryCapacitySchema = (validator) =>
  validator
    .array()
    .items(
      validator.object({
        capacityType: validator
          .string()
          .valid("ORDERS_QUANTITY", "SKUS_QUANTITY")
          .required(),
        maxValue: validator.number().required(),
      })
    )
    .required();

const deliveryRangesSchema = (validator, timeFormat) =>
  validator
    .array()
    .items(
      validator.object({
        startTime: timeFormat,
        endTime: timeFormat,
        listPrice: validator.number().default(0),
        deliveryCapacity: deliveryCapacitySchema(validator),
      })
    )
    .required();

const deliveryScheduleSettingsSchema = (validator, timeFormat) =>
  validator
    .object({
      useDeliverySchedule: validator.boolean().required(),
      maxRangeDelivery: validator.number().required(),
      dayOfWeekForDelivery: validator.array().items(
        validator.object({
          dayOfWeek: validator.number().min(0).max(7).required(),
          deliveryRanges: deliveryRangesSchema(validator, timeFormat),
        })
      ),
    })
    .required();

const carrierScheduleSchema = (validator) =>
  validator
    .array()
    .items(
      validator.object({
        dayOfWeek: validator.number().min(0).max(6).default(0).required(),
        timeLimit: validator.string().default("time_limit").required(),
      })
    )
    .default([]);

const cubicWeightSettingsSchema = (validator) =>
  validator
    .object({
      volumetricFactor: validator.number(),
      minimunAcceptableVolumetricWeight: validator.number(),
    })
    .default({ volumetricFactor: 0, minimunAcceptableVolumetricWeight: 0 });

const modalSettingsSchema = (validator) =>
  validator
    .object({
      modals: validator.array().items(validator.string()).default([]),
      useOnlyItemsWithDefinedModal: validator.boolean().default(false),
    })
    .default({
      modals: [],
      useOnlyItemsWithDefinedModal: false,
    });

const businessHoursSettingsSchema = (validator, businessHoursSchema) =>
  validator
    .object({
      isOpenOutsideBusinessHours: validator.boolean().required().default(false),
      carrierBusinessHours: businessHoursSchema,
    })
    .required();

const pickupPointsSettingsSchema = (validator) =>
  validator
    .object({
      pickupPointIds: validator
        .array()
        .items(validator.string().required())
        .default(["null"]),
      pickupPointTags: validator
        .array()
        .items(validator.string())
        .default(["null"]),
      sellers: validator.array().items(validator.string()).required(),
    })
    .required();

module.exports = buildShippingPolicySchema =
  (validator, businessHoursSchema, timeFormat) => (shippingPolicyInfo) => {
    const schema = validator.object({
      id: validator.string().required(),
      name: validator.string().required(),
      shippingMethod: validator.string().required(),
      weekendAndHolidays: weekendAndHolidaysSchema(validator),
      maxDimension: maxDimensionSchema(validator),
      numberOfItemsPerShipment: validator.number().default(1),
      minimumValueAceptable: validator.number().default(0),
      maximumValueAceptable: validator.number().default(0),
      deliveryScheduleSettings: deliveryScheduleSettingsSchema(
        validator,
        timeFormat
      ),
      carrierSchedule: carrierScheduleSchema(validator),
      cubicWeightSettings: cubicWeightSettingsSchema(validator),
      modalSettings: modalSettingsSchema(validator),
      businessHourSettings: businessHoursSettingsSchema(
        validator,
        businessHoursSchema
      ),
      pickupPointsSettings: pickupPointsSettingsSchema(validator),
      isActive: validator.boolean().default(false),
    });

    const { value: result, error } = schema.validate(shippingPolicyInfo);
    if (error) throw error;
    return result;
  };
