const axios = require('axios');
const { transformCategories } = require('./transforms/categories');
const { transformsProducts, transformsProduct } = require('./transforms/products');
const { apiUrl } = require('../config');

const getAllProductsByQuery = (page, limit) => {
    return axios.get(`${apiUrl}sites/MLA/search?q=${page}`).then((res) => { 
        return res.data;
    }).then((response) => ({
        filters: transformCategories(response.filters),
        items: transformsProducts(response.results.slice(0, limit))
    }));
}

const getAllProductsById = (id) => {
    return Promise.all([
        axios.get(`${apiUrl}items/${id}`),
        axios.get(`${apiUrl}items/${id}/description`)
    ]).then(([productResponse, productDescriptionResponse]) => transformsProduct(productResponse.data, productDescriptionResponse.data))
}

module.exports = {
    getAllProductsByQuery,
    getAllProductsById
}