// adapter test
const fakeClinicFromSheet = require("./__test__/fakeClinicFromSheet");
const sheetClinic = require("./__test__/sheetClinic.json");
const createClinicFromSheetJSON = require("../../clinic/interfaces/controllers/createClinicFromSheetJSON");

describe("Clinic object from adapter", () => {
  it("must validate and return the request object", () => {
    const obj = createClinicFromSheetJSON(sheetClinic);
    expect(obj).toEqual(fakeClinicFromSheet);
  });
});
