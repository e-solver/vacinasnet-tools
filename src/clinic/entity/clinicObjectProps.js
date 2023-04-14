const makeClinicAddress = (address) => {
  const {
    postalCode,
    street,
    number,
    complement,
    reference,
    neighborhood,
    city,
    state,
    latitude,
    longitude,
  } = address;

  validator.string(postalCode);
  validator.string(street);
  validator.string(number);
  validator.string(neighborhood);
  validator.string(city);
  validator.string(state);
  validator.number(latitude);
  validator.number(longitude);

  return Object.freeze({
    get postalCode() {
      return postalCode;
    },
    get street() {
      return street;
    },
    get number() {
      return number;
    },
    get complement() {
      return complement;
    },
    get reference() {
      return reference;
    },
    get neighborhood() {
      return neighborhood;
    },
    get city() {
      return city;
    },
    get state() {
      return state;
    },
    get latitude() {
      return latitude;
    },
    get longitude() {
      return longitude;
    },
  });
};

const makeClinicBusinessHours = (businessHours) => {
  return businessHours.map((businessHoursItem) => {
    validator.object(
      businessHoursItem,
      "Business hour object must not be empty"
    );

    const { dayOfWeek, activeTime, breakTime } = businessHoursItem;

    validator.number(dayOfWeek);
    validator.timeInterval(activeTime, "Invalid clinic active time");
    if (breakTime) {
      validator.timeInterval(breakTime, "Invalid clinic break time");
      validator.timeInterval(
        [activeTime[0], breakTime[0]],
        "Invalid clinic break time: break start time can not be less than opening time"
      );
      validator.timeInterval(
        [breakTime[1], activeTime[1]],
        "Invalid clinic break time: break end time can not be greater than closing time"
      );

      return Object.freeze({
        get dayOfWeek() {
          return dayOfWeek;
        },
        get activeTime() {
          return activeTime;
        },
        get breakTime() {
          return breakTime;
        },
      });
    }
    return Object.freeze({
      get dayOfWeek() {
        return dayOfWeek;
      },
      get activeTime() {
        return activeTime;
      },
    });
  });
};

const makeClinicManagerData = (managerData) => {
  const { name, role, phone, email } = managerData;
  validator.string(name, "Manager name must not be empty");
  validator.string(role, "Manager role must not be empty");
  validator.number(phone, "Manager phone must not be empty");
  validator.email(email, "Manager email must be valid");

  return Object.freeze({
    get name() {
      return name;
    },
    get role() {
      return role;
    },
    get phone() {
      return phone;
    },
    get email() {
      return email;
    },
  });
};

const makeClinicFinancialData = (financialData) => {
  const { bankName, agency, account } = financialData;
  const managerData = makeClinicManagerData(financialData);

  return Object.freeze({
    ...managerData,
    get bankName() {
      return bankName;
    },
    get agency() {
      return agency;
    },
    get account() {
      return account;
    },
  });
};

module.exports = {
  makeClinicAddress,
  makeClinicBusinessHours,
  makeClinicManagerData,
  makeClinicFinancialData,
};
