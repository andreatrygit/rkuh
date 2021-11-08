isPin = require("../src/lambdas/validation")

test('null is not a Pin', () => {
    expect(isPin(null)).toBe(false);
  });