import { AuxiliaryField } from "../db/controllers";

describe("get all product types", () => {
  it("validate function", () => {
    expect(typeof AuxiliaryField.getById).toBe("function");
  });

  it("should throw an error without field_id", async () => {
    const err1 = await AuxiliaryField.getById();
    const err2 = await AuxiliaryField.getById(null);
    const err3 = await AuxiliaryField.getById(undefined);
    const err4 = await AuxiliaryField.getById(NaN);

    expect(err1.message).toMatch(/id|required/i);
    expect(err2.message).toMatch(/id|required/i);
    expect(err3.message).toMatch(/id|required/i);
    expect(err4.message).toMatch(/id|required/i);
  });

  it("should returns categories", async () => {
    const types = await AuxiliaryField.getById(1);

    expect(types.length === 2).toBeTruthy();
  });

  it("should returns 3 types of pizza", async () => {
    const types = await AuxiliaryField.getById(2);

    expect(types.length === 3).toBeTruthy();
  });

  it("should returns 4 product sizes", async () => {
    const types = await AuxiliaryField.getById(3);

    expect(types.length === 4).toBeTruthy();
  });
});
