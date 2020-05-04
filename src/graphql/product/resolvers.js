module.exports = {
  Product: {
    sizes({ id }, args, { ProductSize }) {
      return ProductSize.getSizesByProductId(id);
    },
  },
  ProductSize: {
    productId: ({ product_id }) => product_id,
    sizeId: ({ size_id }) => size_id,
  },
  Query: {
    getProductById(_, { id }, { Product }) {
      return Product.getById(id);
    },
    getProductsByType(_, { typeId }, { Product }) {
      return Product.getByType(typeId);
    },
  },
};
