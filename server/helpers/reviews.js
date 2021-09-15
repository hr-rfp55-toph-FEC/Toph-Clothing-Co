const { api } = require('./api.js');

const getReviews = (params) => (api.get('/reviews', { params }));

const getReviewMeta = (params) => (api.get('/reviews/meta', { params }));

const postReview = (body) => (api.post('/reviews', body));

module.exports = { getReviews, getReviewMeta, postReview };
