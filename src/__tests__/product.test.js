import { Product } from "../db/controllers";

describe("get different products", () => {
  it("validate function", () => {
    expect(typeof Product.getByType).toBe("function");
  });

  it("should throw an error without typeId", async () => {
    const err1 = await Product.getByType();
    const err2 = await Product.getByType(null);
    const err3 = await Product.getByType(undefined);
    const err4 = await Product.getByType(NaN);

    expect(err1.message).toMatch(/typeId|required/i);
    expect(err2.message).toMatch(/typeId|required/i);
    expect(err3.message).toMatch(/typeId|required/i);
    expect(err4.message).toMatch(/typeId|required/i);
  });

  it("should returns <Cheese Pizza>", async () => {
    const pizzas = await Product.getByType(3);

    expect(pizzas.length === 2).toBeTruthy();
  });

  it("should returns <Classic Recipe Pizza>", async () => {
    const pizzas = await Product.getByType(4);

    expect(pizzas.length === 2).toBeTruthy();
  });

  it("should returns <New Recipe Pizza>", async () => {
    const pizzas = await Product.getByType(5);

    expect(pizzas.length === 2).toBeTruthy();
  });
});

describe("Get single product", () => {
  it("validate function", () => {
    expect(typeof Product.getById).toBe("function");
  });

  it("should throw an error without product id", async () => {
    const err1 = await Product.getById();
    const err2 = await Product.getById(null);
    const err3 = await Product.getById(undefined);
    const err4 = await Product.getById(NaN);

    expect(err1.message).toMatch(/id|required/i);
    expect(err2.message).toMatch(/id|required/i);
    expect(err3.message).toMatch(/id|required/i);
    expect(err4.message).toMatch(/id|required/i);
  });

  it("should returns single product", async () => {
    const product = await Product.getById(1);
    expect(product.name).not.toBe("");
  });
});
