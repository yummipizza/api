import { Orders } from "../db/controllers";
import fixtures from "./utilities/fixtures";

describe("Create order", () => {
  it("validate function", () => {
    expect(typeof Orders.create).toBe("function");
  });

  it("should throw an error if the required fields are not provided", async () => {
    const error = await Orders.create();

    expect(error.message).toMatch(/required/i);
  });

  it("should throw an error without client info", async () => {
    const error = await Orders.create(fixtures.order);

    expect(error.message).toMatch(/client|required/i);
  });

  it("should throw an error without products", async () => {
    const error = await Orders.create({
      ...fixtures.order,
      client: fixtures.clientInfo,
    });

    expect(error.message).toMatch(/detail/i);
  });

  it("should save a order", async () => {
    const orderToSave = {
      ...fixtures.order,
      client: fixtures.clientInfo,
      detail: fixtures.orderDetail,
    };

    const orderSaved = await Orders.create(orderToSave);

    expect(orderSaved).toHaveProperty("id");
  });

  it("should set the order total", async () => {
    const orderToSave = {
      ...fixtures.order,
      client: fixtures.clientInfo,
      detail: fixtures.orderDetail,
    };

    let total = orderToSave.deliveryCost;

    fixtures.orderDetail.forEach((item) => {
      const subTotal = item.price * item.quantity;
      total += subTotal;
    });

    const orderSaved = await Orders.create(orderToSave);

    expect(orderSaved.total).toBe(total);
  });

  it("should save the order detail", async () => {
    const orderToSave = {
      ...fixtures.order,
      client: fixtures.clientInfo,
      detail: fixtures.orderDetail,
    };

    const orderSaved = await Orders.create(orderToSave);

    expect(orderSaved.detail.length === 2).toBeTruthy();
  });
});
