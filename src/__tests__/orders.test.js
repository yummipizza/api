// @models
import { OrderDetail, Orders as OrdersModel, Client } from "../db/models";
// @controllers
import { Orders } from "../db/controllers";
// @utilities
import fixtures from "./utilities/fixtures";

afterAll(async () => {
  await OrderDetail.destroy({
    where: {},
    truncate: true,
  });

  await OrdersModel.destroy({ where: {} });
  await Client.destroy({
    where: {},
  });
});

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

describe("Get single order", () => {
  it("validate function", () => {
    expect(typeof Orders.getById).toBe("function");
  });

  it("should throw an error if the order id was not provided", async () => {
    const err1 = await Orders.getById();
    const err2 = await Orders.getById(null);
    const err3 = await Orders.getById(undefined);
    const err4 = await Orders.getById(NaN);

    expect(err1.message).toMatch(/id|required/i);
    expect(err2.message).toMatch(/id|required/i);
    expect(err3.message).toMatch(/id|required/i);
    expect(err4.message).toMatch(/id|required/i);
  });

  it("should returns a order by id", async () => {
    const orderToSave = {
      ...fixtures.order,
      client: fixtures.clientInfo,
      detail: fixtures.orderDetail,
    };

    const orderCreated = await Orders.create(orderToSave);

    const order = await Orders.getById(orderCreated.id);
    expect(order.id).toBe(orderCreated.id);
  });
});

describe("Get orders by client email", () => {
  it("validate function", () => {
    expect(typeof Orders.getByClientEmail).toBe("function");
  });

  it("should throw error if the email was not provided", async () => {
    const error1 = await Orders.getByClientEmail();
    const error2 = await Orders.getByClientEmail("");
    const error3 = await Orders.getByClientEmail(null);
    const error4 = await Orders.getByClientEmail(undefined);

    expect(error1.message).toMatch(/email|required/i);
    expect(error2.message).toMatch(/email|required/i);
    expect(error3.message).toMatch(/email|required/i);
    expect(error4.message).toMatch(/email|required/i);
  });

  it("should returns orders by client email", async () => {
    // create two orders with different clients
    const orderToSave = {
      ...fixtures.order,
      client: fixtures.clientInfo,
      detail: fixtures.orderDetail,
    };

    await Orders.create(orderToSave);

    const email = "other@domain.net";
    orderToSave.client.email = email;
    await Orders.create(orderToSave);

    const orders = await Orders.getByClientEmail(email);
    expect(orders.length === 1).toBeTruthy();
  });
});

describe("Get orders detail by order id", () => {
  it("validate function", () => {
    expect(typeof Orders.getDetail).toBe("function");
  });

  it("should throw an error if the order id was not provided", async () => {
    const err1 = await Orders.getDetail();
    const err2 = await Orders.getDetail(null);
    const err3 = await Orders.getDetail(undefined);
    const err4 = await Orders.getDetail(NaN);

    expect(err1.message).toMatch(/id|required/i);
    expect(err2.message).toMatch(/id|required/i);
    expect(err3.message).toMatch(/id|required/i);
    expect(err4.message).toMatch(/id|required/i);
  });

  it("should returns orders detail by order id", async () => {
    const orderToSave = {
      ...fixtures.order,
      client: fixtures.clientInfo,
      detail: fixtures.orderDetail,
    };

    const orderSaved = await Orders.create(orderToSave);
    const orderDetail = await Orders.getDetail(orderSaved.id);

    expect(orderDetail.length).toBe(orderSaved.detail.length);
  });
});
