const mongoose = require('mongoose');

// fetcher is the name of the db, will default the server to take port 27017
mongoose.connect('mongodb://localhost/toph', { useNewUrlParser: true, useUnifiedTopology: true });

const productInfoSchema = mongoose.Schema({
  // TODO: your schema here!

  product_id: { type: Number, unique: true },
  data: {
    id: Number,
    campus: String,
    name: String,
    slogan: String,
    description: String,
    category: String,
    default_price: String,
    created_at: String,
    updated_at: String,
    features: [
      {
        feature: String,
        value: String,
      }],
  },
});

const relatedProductIdsSchema = mongoose.Schema({
  product_id: { type: Number, unique: true },
  data: [Number],
});

const productStylesSchema = mongoose.Schema({
  product_id: { type: String, unique: true },
  results: [
    {
      style_id: Number,
      name: String,
      original_price: String,
      sale_price: String,
      'default?': Boolean,
      photos: [
        {
          thumbnail_url: String,
          url: String,
        },
      ],
      skus: mongoose.Types.Mixed,
    },
  ],
});
// const productMetaSchema = mongoose.Schema({})

const ProductInfo = mongoose.model('ProductInfo', productInfoSchema);
const RelatedProductIds = mongoose.model('RelatedProductIds', relatedProductIdsSchema);
const ProductStyles = mongoose.model('ProductStyles', productStylesSchema);
// const ProductMeta = mongoose.model('ProductMeta', productMetaSchema);

// const saveProductInfo = (productInfo) => {
//     // console.log('productInfo', productInfo);
//   ProductInfo.create(productInfo.data);
// };

// const saveRelatedProductIds = (prodId, relatedProductIds) => {
//   // console.log('productInfo', productInfo);
//   const relatedProductIdsObj = {
//     id: prodId,
//     related: relatedProductIds.data,
//   };
//   // RelatedProductIds.create(relatedProductIdsObj);
// };

// const saveProductStyles = (productStyles) => {
//   // console.log('productStyles', productStyles);
//   const productStylesObj = {
//     id: Number.parseInt(productStyles.data.product_id, 10),
//     product_id: productStyles.data.product_id,
//     results: productStyles.data.results,
//   };
//   // console.log('productStylesObj', productStylesObj);
//   // ProductStyles.create(productStylesObj);
// };

// const saveProductMeta = (productMeta) => {
//   // console.log('productMeta', productMeta);
//   // ProductMeta.create(productMeta.data);
// };

// module.exports.saveProductInfo = saveProductInfo;
// module.exports.saveRelatedProductIds = saveRelatedProductIds;
// module.exports.saveProductStyles = saveProductStyles;
// module.exports.saveProductMeta = saveProductMeta;

// // saveProductStyles()