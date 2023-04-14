const removeWhiteSpaces = (string) => {
  return string.replace(/\s/g, "");
};

const removeAccents = (string) => {
  return string.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const capitalize = (string) => {
  let regex = new RegExp(/(\b[a-z](?!\s))/g);
  return string.replace(regex, (c) => c.toUpperCase());
};

const removeSpecialChars = (string) => {
  return string.replace(/[(),']/g, "");
};

const formatString = {
  capitalize,
  removeAccents,
  removeWhiteSpaces,
  removeSpecialChars,
  format(string) {
    let newStr = string;
    newStr = removeAccents(newStr);
    newStr = capitalize(newStr);
    newStr = removeWhiteSpaces(newStr);
    newStr = removeSpecialChars(newStr);
    return newStr;
  },
};

module.exports = makeVtexId = ({ name, city, state }, type) => {
  const obj = {
    get vclin() {
      return `VCLIN_${obj.pickupPoint}`;
    },
    get pickupPoint() {
      return `${formatString.format(name)}_${formatString.format(
        city
      )}_${state.toUpperCase()}`;
    },
    get warehouse() {
      return `Est_XXXX_${obj.pickupPoint}`;
    },
  };

  return Object.freeze(obj[type]);
};
