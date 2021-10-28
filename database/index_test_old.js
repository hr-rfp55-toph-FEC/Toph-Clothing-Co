// const mongoose = require('mongoose');

// // fetcher is the name of the db, will default the server to take port 27017
// mongoose.connect('mongodb://localhost/toph', { useNewUrlParser: true, useUnifiedTopology: true });

// const productInfoSchema = mongoose.Schema({
//   // TODO: your schema here!

//   _id: mongoose.Types.ObjectId,
//   id: { type: Number, unique: true },
//   campus: String,
//   name: String,
//   slogan: String,
//   description: String,
//   category: String,
//   default_price: String,
//   created_at: String,
//   updated_at: String,
//   features: [
//     {
//       feature: String,
//       value: String,
//     }],
// });

// const relatedProductIdsSchema = mongoose.Schema({
//   _id: mongoose.Types.ObjectId,
//   data: [Number],
// });

// const productStylesSchema = mongoose.Schema({
//   _id: mongoose.Types.ObjectId,
//   product_id: String,
//   results: [
//     {
//       style_id: Number,
//       name: String,
//       original_price: String,
//       sale_price: String,
//       'default?': Boolean,
//       photos: [
//         {
//           thumbnail_url: String,
//           url: String,
//         },
//       ],
//       skus: mongoose.Types.Mixed,
//     },
//   ],
// });
// // const productMetaSchema = mongoose.Schema({})

// const ProductInfo = mongoose.model('ProductInfo', productInfoSchema);
// const RelatedProductIds = mongoose.model('RelatedProductIds', relatedProductIdsSchema);
// const ProductStyles = mongoose.model('ProductStyles', productStylesSchema);
// // const ProductMeta = mongoose.model('ProductMeta', productMetaSchema);

// const saveProductInfo = (productInfo) => {
//   console.log('productInfo', productInfo);
//   const productInfoObj = { ...productInfo.data, _id: productInfo.data.id };
//   console.log('productInfoObj', productInfoObj);
//   ProductInfo.create(productInfoObj);
// };

// const saveRelatedProductIds = (prodId, relatedProductIds) => {
//   // console.log('productInfo', productInfo);
//   const relatedProductIdsObj = {
//     _id: prodId,
//     data: relatedProductIds.data,
//   };
//   // console.log('relatedProductIdsObj', relatedProductIdsObj);
//   RelatedProductIds.create(relatedProductIdsObj);
// };

// const saveProductStyles = (productStyles) => {
//   // console.log('productStyles', productStyles);
//   const productStylesObj = {
//     _id: Number.parseInt(productStyles.product_id, 10),
//     product_id: productStyles.product_id,
//     results: productStyles.results,
//   };
//   // console.log('productStylesObj', productStylesObj);
//   ProductStyles.create(productStylesObj);
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