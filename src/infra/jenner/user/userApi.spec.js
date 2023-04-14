// schema test
const fakeUser = require("./__test__/fakeUser.json");
const { userSchema } = require("../../joi/jenner");

// adapter test
const fakeClinic = require("../../../clinic/entity/__test__/fakeClinic");
const fakeUserFromFakeClinic = require("./__test__/fakeUserFromFakeClinic");
const { makeUser } = require("../../../clinic/interfaces/presenters/jenner");

describe("Jenner user payload:", () => {
  it("must validate and return the request object", () => {
    const obj = fakeUser;
    expect(userSchema(obj)).toEqual(obj);
  });
});

describe("Jenner clinic payload from adapter", () => {
  it("must validate and return the request object", () => {
    const obj = makeUser(fakeClinic(), { relatedClinics: [{ _id: "123" }] });
    expect(userSchema(obj)).toEqual(fakeUserFromFakeClinic);
  });
});
