const { api } = require('./api.js');

function getProductList() {
  return api.get('/products');
}

function getProductStyles(productID) {
  return api.get(`/products/${productID}/styles`);
}

// Set 'count' of results to 1,000,000 to grab all reviews
function getProductReviews(productID) {
  return api.get(`/reviews/?product_id=${productID}&count=1000000`);
}

function getProductRatings(productID) {
  return api.get(`/reviews/meta/?product_id=${productID}`);
}

function getCart() {
  return api.get('/cart');
}

function addToCart(product) {
  return api.post('/cart', product);
}

module.exports = {
  getProductList,
  getProductStyles,
  getProductReviews,
  getProductRatings,
  getCart,
  addToCart,
};
