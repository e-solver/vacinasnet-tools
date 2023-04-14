// schema test
const fakeJennerClinic = require("./__test__/fakeJennerClinic.json");
const { jennerClinicSchema } = require("../../joi/jenner");

// adapter test
const fakeClinic = require("../../../clinic/entity/__test__/fakeClinic");
const fakeJennerClinicFromFakeClinic = require("./__test__/fakeJennerClinicFromFakeClinic");
const {
  makeJennerClinic,
} = require("../../../clinic/interfaces/presenters/jenner");

describe("Jenner clinic payload:", () => {
  it("must validate and return the request object", () => {
    const obj = fakeJennerClinic;
    expect(jennerClinicSchema(obj)).toEqual(obj);
  });
});

describe("Jenner clinic payload from adapter", () => {
  it("must validate and return the request object", () => {
    const obj = makeJennerClinic(
      fakeClinic(),
      {
        warehouseId: "Est_XXXX_ClinicaDeTeste_Santos_SP",
        slasIds: ["Atendimento na Clínica Clínica de Teste - Santos"],
      },
      { clinicGroupId: "123" }
    );
    expect(jennerClinicSchema(obj)).toEqual(fakeJennerClinicFromFakeClinic);
  });
});
