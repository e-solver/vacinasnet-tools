const addClinic = require("../../usecases/index");

const doesHaveTime = (time) => {
  return !time.includes(undefined) ? time : "";
};

const daysMap = {
  businessDays: [1, 2, 3, 4, 5],
  saturdays: [6],
  sundays: [0],
};

const removeSpecialChars = (str) => str.replace(/[^a-zA-Z0-9]/g, "");

const createBusinessHours = (hours) => {
  let businessHours = [];

  for (const days in daysMap) {
    if (doesHaveTime(hours[days][0])) {
      businessHours.push(
        daysMap[days].map((dayOfWeek) => ({
          dayOfWeek,
          activeTime: hours[days][0],
          ...(hours[days][1] && { breakTime: hours[days][1] }),
        }))
      );
    }
  }
  return businessHours.flat();
};

module.exports = createClinicFromSheetJSON = (sheetInfo) => {
  const breakTime = [sheetInfo["Início do almoço"], sheetInfo["Fim do almoço"]];
  const saturdaysTime = [
    sheetInfo["Hora de abertura – Sábados"],
    sheetInfo["Hora de fechamento – Sábados"],
  ];
  const sundaysTime = [
    sheetInfo["Hora de abertura – Domingos"],
    sheetInfo["Hora de fechamento – Domingos"],
  ];

  const hours = {
    businessDays: [
      [
        sheetInfo["Hora de abertura – Segunda a sexta"],
        sheetInfo["Hora de fechamento – Segunda a sexta"],
      ],
      doesHaveTime(breakTime),
    ],
    saturdays: [doesHaveTime(saturdaysTime)],
    sundays: [doesHaveTime(sundaysTime)],
  };

  const businessHours = createBusinessHours(hours);

  const clinicObj = Object.freeze({
    name: sheetInfo["Nome da unidade"],
    cnpj: removeSpecialChars(`${sheetInfo["CNPJ"]}`),
    thumbnail: sheetInfo["Thumbnail URL"],
    companyName: sheetInfo["Razão Social"],
    clinicGroupName: sheetInfo["Nome da Rede"],
    address: {
      postalCode: `${sheetInfo["CEP"]}`,
      street: sheetInfo["Endereço"],
      number: `${sheetInfo["Número"]}`,
      complement: sheetInfo["Complemento"] || "",
      reference: sheetInfo["Referência"] || "",
      neighborhood: sheetInfo["Bairro"],
      city: sheetInfo["Cidade"],
      state: sheetInfo["Estado"],
      latitude: sheetInfo["Latitude"],
      longitude: sheetInfo["Longitude"],
    },
    phone:
      removeSpecialChars(`${sheetInfo["Telefone"]}`) ||
      removeSpecialChars(`${sheetInfo["Gerência – Telefone"]}`) ||
      " ",
    website: sheetInfo["Website"] || "",
    businessHours,
    managerData: {
      name: sheetInfo["Gerência - Nome do responsável"],
      role: sheetInfo["Gerência – Cargo"],
      phone: removeSpecialChars(`${sheetInfo["Gerência – Telefone"]}`),
      email: sheetInfo["Gerência – E-mail"],
    },
    financialData: {
      name: sheetInfo["Financeiro – Nome do responsável"],
      role: sheetInfo["Financeiro – Cargo"],
      phone: removeSpecialChars(`${sheetInfo["Gerência – Telefone"]}`),
      email: sheetInfo["Financeiro – E-mail"],
      bankName: `${sheetInfo["Banco"]}` || "",
      agency: `${sheetInfo["Agência"]}` || "",
      account: `${sheetInfo["Conta"]}` || "",
    },
  });

  return addClinic(clinicObj);
};
