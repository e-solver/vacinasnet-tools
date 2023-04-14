const makeFakeClinic = require("./__test__/fakeClinic");
const makeClinic = require("./");

describe("Clinic entity payload", () => {
  it("must validate and return the request object", () => {
    const clinic = makeFakeClinic();
    expect({ ...makeClinic(clinic) }).toEqual(clinic);
  });
});
