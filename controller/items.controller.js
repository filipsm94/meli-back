const { getAllProductsByQuery, getAllProductsById } = require('../services/searchProducts');

const buscarProductos = async (req, res, next) => { // pruebas e2e con supertest mockeando servicios
  try {
    const { q: page } = req.query;
    const { categories, items } = await getAllProductsByQuery(page, 4);
    
    const jsonResponse = {
      author: {
        name: 'Felipe',
        lastname: 'Mesa'
      },
      categories,
      items
    }
    res.json(jsonResponse);
  } catch (error) {
    next(error);
  }
};

const buscarProducto = async (req, res, next) => {
  try {
    const id = req.params.id;
    const item = await getAllProductsById(id);
    const jsonResponse = {
      author: {
        name: 'Felipe',
        lastname: 'Mesa'
      },
      item
    }
    res.json(jsonResponse);
  } catch (error) {
    next(error);
  }
};

module.exports = { buscarProductos, buscarProducto };