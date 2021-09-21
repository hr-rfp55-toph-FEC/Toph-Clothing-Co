const { api } = require('./api.js');
const products = require('./products.js');

module.exports = {

  getProductInfo: (prodId) => api.get(`/products/${prodId}`)
    .then((data) => data)
    .catch((err) => console.log(err)),

  getRelatedProductIds: (currProdId) => api.get(`/products/${currProdId}/related`)
    .catch((err) => console.log(err)),

  getProductStyles: (currProdId) => api.get(`/products/${currProdId}/styles`)
    .then((data) => data)
    .catch((err) => console.log(err)),

  getProductMeta: (currProdId) => api.get('/reviews/meta', {
    params: {
      product_id: currProdId,
    },
  })
    .then((data) => data)
    .catch((err) => console.log(err)),

  getCurrrentProductsInfo: (currProdId) => {
    const getProductInfo = module.exports.getProductInfo(currProdId).then((res) => res.data);
    const getProductStyles = module.exports.getProductStyles(currProdId).then((res) => res.data);
    const getProductMeta = module.exports.getProductMeta(currProdId).then((res) => res.data);
    const getProductReviews = products.getProductReviews(currProdId).then((res) => res.data);
    const promises = [getProductInfo, getProductStyles, getProductMeta, getProductReviews];
    return Promise.all(promises)
      .catch((err) => console.log(err));
  },

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

  getRelatedProductMeta: (currProdId) => module.exports.getRelatedProductIds(currProdId)
    .then((relatedIds) => relatedIds.data.map((id) => module.exports.getProductMeta(id)))
    .then((relProdMetaPromises) => Promise.all(relProdMetaPromises))
    .then((response) => response.map((res) => res.data))
    .then((relProdMeta) => relProdMeta)
    .catch((err) => console.log(err)),

  genRelProdResObj: (currProdId) => {
    const promises = [module.exports.getRelatedProductsInfo(currProdId),
      module.exports.getRelatedProductStyles(currProdId),
      module.exports.getRelatedProductMeta(currProdId),
    ];
    return Promise.all(promises)
      .catch((err) => console.log(err));
  },

};
