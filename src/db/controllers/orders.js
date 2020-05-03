// @vendors
import * as Joi from "@hapi/joi";
/// @models
import { Models } from "../models";

const validateCreateOrderSchema = Joi.object({
  deliveryCost: Joi.number(),
  completed: Joi.boolean(),
  client: Joi.object()
    .keys({
      fullName: Joi.string().required(),
      deliveryAddress: Joi.string().required(),
      mobile: Joi.string().required(),
      email: Joi.string().email().required(),
    })
    .required(),
  detail: Joi.array()
    .items(
      Joi.object().keys({
        product: Joi.number().required(),
        size: Joi.number().required(),
        quantity: Joi.number().required(),
        price: Joi.number().required(),
      })
    )
    .required(),
});

async function createClient(client) {
  const clientInstance = await Models.Client.findOrCreate({
    where: { email: client.email },
    defaults: {
      ...client,
    },
  });

  const clientCreated = clientInstance[0].get({ plain: true });
  return clientCreated;
}

function calculateTotal(deliveryCost, orderDetail) {
  let total = deliveryCost;

  orderDetail.forEach((item) => {
    const subTotal = item.price * item.quantity;
    total += subTotal;
  });

  return total;
}

async function createOrderDetail(orderId, orderDetail) {
  const rowsToCreate = orderDetail.map((item) => ({
    order_id: orderId,
    product_size_id: item.size,
    quantity: item.quantity,
  }));

  const orderDetailInstance = await Models.OrderDetail.bulkCreate(rowsToCreate);

  return orderDetailInstance;
}

export const Orders = {
  async create(order = {}) {
    try {
      await validateCreateOrderSchema.validateAsync(order);

      // Create client
      const clientCreated = await createClient(order.client);

      const total = calculateTotal(order.deliveryCost, order.detail);

      const orderInstance = await Models.Orders.create({
        delivery_cost: order.deliveryCost,
        completed: order.completed,
        paidAt: Date.now(),
        client_id: clientCreated.id,
        total,
      });

      const orderCreated = orderInstance.get({ plain: true });

      const orderDetail = await createOrderDetail(
        orderCreated.id,
        order.detail
      );

      orderCreated.detail = orderDetail;

      return orderCreated;
    } catch (error) {
      return error;
    }
  },
};
