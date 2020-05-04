import { ProductSize } from "../db/controllers";

describe("Get product sizes by product id", () => {
  it("validate function", () => {
    expect(typeof ProductSize.getSizesByProductId).toBe("function");
  });

  it("should throw an error without product id", async () => {
    const err1 = await ProductSize.getSizesByProductId();
    const err2 = await ProductSize.getSizesByProductId(null);
    const err3 = await ProductSize.getSizesByProductId(undefined);
    const err4 = await ProductSize.getSizesByProductId(NaN);

    expect(err1.message).toMatch(/id|required/i);
    expect(err2.message).toMatch(/id|required/i);
    expect(err3.message).toMatch(/id|required/i);
    expect(err4.message).toMatch(/id|required/i);
  });

  it("should returns 4 sizes with their prices", async () => {
    const pizzaSizes = await ProductSize.getSizesByProductId(1);

    expect(pizzaSizes.length > 0).toBeTruthy();
    expect(pizzaSizes[0].price).not.toBe(0);
    expect(pizzaSizes[0].size).not.toBeUndefined();
    expect(pizzaSizes[0].size.description).not.toBe("");
  });
});
