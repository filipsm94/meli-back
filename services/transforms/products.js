const transformsProduct = (product, productDescription) => {
  return {
    id: product.id,
    title: product.title,
    price: {
      currency: product.currency_id,
      amount: product.price
    },
    picture: product.pictures[0].url,
    condition: product.condition,
    free_shipping: product.shipping.free_shipping,
    sold_quantity: product.sold_quantity,
    description: productDescription.plain_text,
    features: product.attributes,
  }
}

const transformsProducts = (products) => {
  return products.map((product) => {
    return {
      id: product.id,
      title: product.title,
      price: {
        currency: product.currency_id,
        amount: product.price
      },
      picture: product.thumbnail,
      condition: product.condition,
      free_shipping: product.shipping.free_shipping,
    }
  });
}

module.exports = {
  transformsProducts,
  transformsProduct
};