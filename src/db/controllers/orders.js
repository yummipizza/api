// @models
import { Client, OrderDetail, Orders as OrdersModel } from "../models";
// @validators
import {
  validateCreateOrderSchema,
  validateIdSchema,
  validateEmailSchema,
} from "../utilities/validators";

async function createClient(client) {
  const clientInstance = await Client.findOrCreate({
    where: { email: client.email },
    defaults: {
      ...client,
    },
  });

  const clientCreated = clientInstance[0].get({ plain: true });
  return clientCreated;
}

function calculateTotal(deliveryCost = 0, orderDetail) {
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

  const orderDetailInstance = await OrderDetail.bulkCreate(rowsToCreate);

  return orderDetailInstance;
}

export const Orders = {
  async create(order = {}) {
    try {
      await validateCreateOrderSchema.validateAsync(order);

      // Save client info
      const clientCreated = await createClient(order.client);

      const total = calculateTotal(order.deliveryCost, order.detail);

      // Save order info
      const orderInstance = await OrdersModel.create({
        delivery_cost: order.deliveryCost,
        completed: order.completed,
        paidAt: Date.now(),
        client_id: clientCreated.id,
        total,
      });

      const orderCreated = orderInstance.get({ plain: true });

      // Save order detail
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
  async getById(orderId) {
    try {
      await validateIdSchema.validateAsync({ id: orderId });

      return OrdersModel.findByPk(orderId);
    } catch (error) {
      return error;
    }
  },
  async getByClientEmail(email) {
    try {
      await validateEmailSchema.validateAsync({ email });

      return OrdersModel.findAll({
        include: [
          {
            model: Client,
            as: "client",
            where: { email },
          },
        ],
      });
    } catch (error) {
      return error;
    }
  },
  async getDetail(orderId) {
    try {
      await validateIdSchema.validateAsync({ id: orderId });

      return OrderDetail.findAll({
        where: {
          order_id: orderId,
        },
      });
    } catch (error) {
      return error;
    }
  },
};
