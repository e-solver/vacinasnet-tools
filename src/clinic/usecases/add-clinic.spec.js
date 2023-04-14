const addClinic = require("./");
const makeFakeClinic = require("../entity/__test__/fakeClinic");

describe("Clinic entity payload", () => {
  it("must validate and return the request object", () => {
    const clinic = makeFakeClinic();
    expect(addClinic(clinic)).toEqual(clinic);
  });
});
