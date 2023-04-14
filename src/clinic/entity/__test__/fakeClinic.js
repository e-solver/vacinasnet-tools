module.exports = makeFakeClinic = (overrides) => {
  const clinic = {
    name: "Clínica de teste",
    cnpj: "123412341234",
    thumbnail:
      "https://www.vacinasnet.vteximg.com.br/arquivos/Favicon-1807.png?v=637937630640970000",
    companyName: "Clínicas de teste LTDA.",
    clinicGroupName: "Clínicas de teste",
    address: {
      postalCode: "12345678",
      street: "Rua Torres Homem",
      number: "123",
      complement: "",
      reference: "",
      neighborhood: "Embaré",
      city: "Santos",
      state: "SP",
      latitude: -23.961992,
      longitude: -46.31853,
    },
    phone: "1332222988",
    website: "www.vacinas.net",
    businessHours: [
      {
        dayOfWeek: 1,
        activeTime: ["08:00:00", "18:00:00"],
        breakTime: ["12:00:00", "13:00:00"],
      },
      {
        dayOfWeek: 2,
        activeTime: ["08:00:00", "18:00:00"],
        breakTime: ["12:00:00", "13:00:00"],
      },
      {
        dayOfWeek: 3,
        activeTime: ["08:00:00", "18:00:00"],
        breakTime: ["12:00:00", "13:00:00"],
      },
      {
        dayOfWeek: 4,
        activeTime: ["08:00:00", "18:00:00"],
        breakTime: ["12:00:00", "13:00:00"],
      },
      {
        dayOfWeek: 5,
        activeTime: ["09:00:00", "13:00:00"],
      },
    ],
    managerData: {
      name: "Rodrigo Porto",
      role: "Manager",
      phone: "13932827521",
      email: "porto@vacinas.net",
    },
    financialData: {
      name: "Rodrigo Porto",
      role: "Manager",
      phone: "13932827521",
      email: "porto@vacinas.net",
      bankName: "Nubank",
      agency: "0",
      account: "1234",
    },
  };

  return {
    ...clinic,
    ...overrides,
  };
};
