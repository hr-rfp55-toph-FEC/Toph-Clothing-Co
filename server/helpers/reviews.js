const { api } = require('./api.js');

const getReviews = (queryParams) => (api.get('/reviews', {
  params: {
    product_id: queryParams.product_id,
    count: queryParams.count,
    sort: queryParams.sort,
  },
})
);

module.exports = { getReviews };
