module.exports = {
  Order: {
    detail({ id }, args, { Orders }) {
      return Orders.getDetail(id);
    },
  },
  OrderDetail: {
    product({ product_id }, args, { Product }) {
      return Product.getById(product_id);
    },
  },
  Mutation: {
    createOrder(_, { order }, { Orders }) {
      return Orders.create(order);
    },
  },
};
