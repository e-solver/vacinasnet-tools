module.exports = fakeJennerClinicFromFakeClinic = {
  cnpj: "123412341234",
  companyName: "Clínicas de teste LTDA.",
  name: "Clínica de teste",
  address: {
    city: "Santos",
    state: "SP",
    zipCode: "12345678",
    neighborhood: "Embaré",
    streetName: "Rua Torres Homem",
    streetNumber: "123",
    complement: "",
  },
  phone: "1332222988",
  website: "www.vacinas.net",
  managerData: {
    name: "Rodrigo Porto",
    responsibility: "Manager",
    phone: "13932827521",
    email: "porto@vacinas.net",
  },
  financialGroupData: {
    name: "Rodrigo Porto",
    responsibility: "Manager",
    phone: "13932827521",
    email: "porto@vacinas.net",
    bankAccount: {
      bankName: "Nubank",
      agency: "0",
      account: "1234",
    },
  },
  externalData: {
    vtex: {
      warehouseId: "Est_XXXX_ClinicaDeTeste_Santos_SP",
      slasIds: ["Atendimento na Clínica Clínica de Teste - Santos"],
    },
  },
  clinicGroup: { _id: "123" },
};
