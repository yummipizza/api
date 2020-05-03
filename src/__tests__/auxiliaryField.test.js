import { AuxiliaryField } from "../db/controllers";

describe("get all product types", () => {
  it("validate function", () => {
    expect(typeof AuxiliaryField.getByFieldId).toBe("function");
  });

  it("should throw an error without field_id", async () => {
    const err1 = await AuxiliaryField.getByFieldId();
    const err2 = await AuxiliaryField.getByFieldId(null);
    const err3 = await AuxiliaryField.getByFieldId(undefined);
    const err4 = await AuxiliaryField.getByFieldId(NaN);

    expect(err1.message).toMatch(/fieldId|required/i);
    expect(err2.message).toMatch(/fieldId|required/i);
    expect(err3.message).toMatch(/fieldId|required/i);
    expect(err4.message).toMatch(/fieldId|required/i);
  });

  it("should returns categories", async () => {
    const types = await AuxiliaryField.getByFieldId(1);

    expect(types.length === 2).toBeTruthy();
  });

  it("should returns 3 types of pizza", async () => {
    const types = await AuxiliaryField.getByFieldId(2);

    expect(types.length === 3).toBeTruthy();
  });

  it("should returns 4 product sizes", async () => {
    const types = await AuxiliaryField.getByFieldId(3);

    expect(types.length === 4).toBeTruthy();
  });
});
