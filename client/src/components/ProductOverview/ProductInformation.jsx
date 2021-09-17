// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import Stars from '../Stars';
import calcAvgRating from '../helpers/calcAvgRating';

function ProductInformation(props) {
  const {
    product,
    productReviews,
    productRatings,
    productStyleSelected,
  } = props;

  // console.log('product', product);
  // console.log('productStyleSelected', productStyleSelected);

  const showStars = Object.keys(productRatings.ratings).length !== 0;
  const productReviewsID = showStars ? 'product-reviews' : 'product-reviews-no-stars';

  const origPrice = productStyleSelected.original_price;
  const salePrice = productStyleSelected.sale_price;

  return (
    <div id="product-information" className="product-right-component">
      <div id="product-rating">
        { showStars
        && <Stars rating={calcAvgRating(productRatings.ratings)} id={`DH-${product.id}`} />}
        <a id={productReviewsID} href="#ratings-reviews-section">
          {productReviews.results === undefined || productReviews.results.length === 0
            ? null
            : `Read all ${productReviews.results.length} reviews`}
        </a>
      </div>
      <div id="product-category">{product.category.toUpperCase()}</div>
      <div id="product-name"><b>{product.name}</b></div>
      <div id="product-price-main">
        {salePrice
          ? (
            <>
              <span className="sale-price">{`$${salePrice} `}</span>
              <span className="orig-price-strike">{`$${origPrice}`}</span>
            </>
          )
          : <span>{` $${origPrice}`}</span>}
      </div>
    </div>
  );
}

ProductInformation.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  productReviews: PropTypes.instanceOf(Object).isRequired,
  productRatings: PropTypes.instanceOf(Object).isRequired,
  productStyleSelected: PropTypes.instanceOf(Object).isRequired,
};

export default ProductInformation;
