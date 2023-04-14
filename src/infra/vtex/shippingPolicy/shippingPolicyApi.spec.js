// schema test
const fakeShippingPolicy = require("./__test__/fakeShippingPolicy.json");
const { shippingPolicySchema } = require("../../joi/vtex/");

// adapter test
const fakeClinic = require("../../../clinic/entity/__test__/fakeClinic");
const fakeShippingPolicyFromFakeClinic = require("./__test__/fakeShippingPolicyFromFakeClinic");
const {
  makeShippingPolicy,
} = require("../../../clinic/interfaces/presenters/vtex");

describe("Shipping policy payload:", () => {
  it("must validate and return the request object", () => {
    const obj = fakeShippingPolicy;
    expect(shippingPolicySchema(obj)).toEqual(obj);
  });
});

describe("Pickup point payload from adapter", () => {
  it("must validate and return the request object", () => {
    const obj = makeShippingPolicy(fakeClinic());
    expect(shippingPolicySchema(obj)).toEqual(fakeShippingPolicyFromFakeClinic);
  });
});
