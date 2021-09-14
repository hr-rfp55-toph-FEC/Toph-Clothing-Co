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

  getRelatedProductsInfo: (currProdId) => module.exports.getRelatedProductIds(currProdId)
    .then((relatedIds) => relatedIds.data.map((id) => module.exports.getProductInfo(id)))
    .then((relatedProdsInfoPromises) => Promise.all(relatedProdsInfoPromises))
    .then((response) => response.map((res) => res.data))
    .then((relProdsInfo) => relProdsInfo)
    .catch((err) => console.log(err)),

  getRelatedProductStyles: (currProdId) => module.exports.getRelatedProductIds(currProdId)
    .then((relatedIds) => relatedIds.data.map((id) => module.exports.getProductStyles(id)))
    .then((relatedStylesPromises) => Promise.all(relatedStylesPromises))
    .then((response) => response.map((res) => res.data))
    .then((relProdStyles) => relProdStyles)
    .catch((err) => console.log(err)),

};
