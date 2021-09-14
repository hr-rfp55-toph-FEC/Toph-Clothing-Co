const api = require('./api.js');

module.exports = {

  getProductInfo: (prodId) => api.get(`/products/${prodId}`)
    .then((data) => data)
    .catch((err) => console.log(err)),

  getRelatedProductIds: (currProdId) => api.get(`/products/${currProdId}/related`)
    .catch((err) => console.log(err)),

  getProductStyles: (currProdId) => api.get(`/products/${currProdId}/styles`)
    .then((data) => data)
    .catch((err) => console.log(err)),

  getRelatedProductsInfo: (currProdId) => {
    this.getRelatedProductIds(currProdId)
      .then((relatedIds) => relatedIds.data.map((id) => this.getProductInfo(id)))
      .then((relatedProdsInfoPromises) => Promise.all(relatedProdsInfoPromises))
      .then((response) => response.map((res) => res.data))
      .then((relProdsInfo) => this.setState({ relatedProdsInfo: relProdsInfo }))
      .catch((err) => console.log(err));
  },

  getRelatedProductStyles: (currProdId) => {
    this.getRelatedProductIds(currProdId)
      .then((relatedIds) => relatedIds.data.map((id) => this.getProductStyles(id)))
      .then((relatedStylesPromises) => Promise.all(relatedStylesPromises))
      .then((response) => response.map((res) => res.data))
      .then((relProdStyles) => this.setState({ relatedProdStyles: relProdStyles }))
      .catch((err) => console.log(err));
  },

};
