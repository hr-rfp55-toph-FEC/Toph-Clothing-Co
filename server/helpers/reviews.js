const axios = require('axios');
const api = require('./api.js');

const getReviews = (productId) => {
  api.get('/reviews', {
    params: {
      product_id: 40345,
      count: 100,
    }
  })
}
module.exports = {




};
