module.exports = validator = {
  // TO-DO bulk validations, advanced validations and options obj
  string(data, msg) {
    if (data === "") {
      throw new Error(msg || "Invalid string: " + data);
    }
  },
  number(data, msg) {
    if (data === "" || isNaN(+data)) {
      throw new Error(msg || "Invalid number: " + data);
    }
  },
  boolean(data, msg) {
    if (typeof data != boolean) {
      throw new Error(msg || "Value must be either true or false");
    }
  },
  array(data, msg) {
    if (!data.length) {
      throw new Error(msg || "Empty or invalid array");
    }
  },
  object(data, msg) {
    if (Object.keys(data).length == 0) {
      throw new Error(msg || "Object must not be empty");
    }
  },
  email(data, msg) {
    const regex = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    if (!data || !regex.test(data)) {
      throw new Error(msg || "Invalid e-mail:" + data);
    }
  },
  time(data, msg) {
    const regex = new RegExp(/(?:[01]\d|2[0-3]):(?:[0-5]\d):(?:[0-5]\d)/);
    if (!data || !regex.test(data)) {
      throw new Error(msg || "Invalid time: " + time);
    }
  },
  timeInterval(data, msg) {
    validator.time(data[0], `${msg} (${data}): invalid start time`);
    validator.time(data[1], `${msg} (${data}): invalid end time`);

    if (
      new Date(`December 31, 2023 ${data[0]}`) >=
      new Date(`December 31, 2023 ${data[1]}`)
    ) {
      throw new Error(msg || "Start time can not be greater than end time");
    }
  },
  url(data, msg) {
    validator.string(data, "Empty URL string");
    const regex = new RegExp(
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
    );
    if (!regex.test(data)) {
      throw new Error(msg || "Invalid URL");
    }
  },
};
