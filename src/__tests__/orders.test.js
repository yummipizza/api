import { Orders } from "../db/controllers";

describe("Create order", () => {
  it("validate function", () => {
    expect(typeof Orders.create).toBe("function");
  });

  // it('should throw an error if the riquired ')
});
