const { api } = require('./api.js');

const getReviews = (queryParams) => (api.get('/reviews', { queryParams }));

const getReviewMeta = (queryParams) => (api.get('/reviews/meta', { queryParams }));

const postReview = (body) => (api.post('/reviews', body));

const markHelpful = (id) => (api.put(`reviews/${id}/helpful`));

module.exports = {
  getReviews, getReviewMeta, postReview, markHelpful,
};
