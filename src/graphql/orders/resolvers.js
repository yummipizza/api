module.exports = {
  Order: {
    detail({ id }, args, { Orders }) {
      return Orders.getDetail(id);
    },
    deliveryCost: ({ delivery_cost }) => delivery_cost,
  },
  OrderDetail: {
    product({ product_id }, args, { Product }) {
      return Product.getById(product_id);
    },
  },
  Query: {
    getOrderById(_, { id }, { Orders }) {
      return Orders.getById(id);
    },
    getOrdersByClientEmail(_, { email }, { Orders }) {
      return Orders.getByClientEmail(email);
    },
  },
  Mutation: {
    createOrder(_, { order }, { Orders }) {
      return Orders.create(order);
    },
  },
};
