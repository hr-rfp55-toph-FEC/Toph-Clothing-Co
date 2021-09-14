const api = require('./api.js');

function getProductList() {
  return api.get('/products');
}

function getProductStyles(productID) {
  return api.get(`/products/${productID}/styles`);
}

module.exports = {
  getProductList,
  getProductStyles,
};
