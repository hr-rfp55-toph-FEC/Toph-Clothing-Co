// import React, { useState } from 'react';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import Stars from '../Stars';

function ProductInformation(props) {
  const { product, productReviews, productRatings } = props;

  useEffect(() => {
    if (document.getElementById('product-stars') !== null) {
      // document.getElementById('product-stars').value = null;
    }
  });

  if (JSON.stringify(product) === '{}') {
    return null;
  }

  return (
    <div id="product-information" className="product-right-component">
      <div id="product-rating">
        <Stars />
        {/* <span id="product-stars">★★★★★</span> */}
        <a id="product-reviews" href="#bottom">
          {productReviews.results === undefined || productReviews.results.length === 0
            ? null
            : `Read all ${productReviews.results.length} reviews`}
        </a>
      </div>
      <div id="product-category">{product.category.toUpperCase()}</div>
      <div id="product-name"><b>{product.name}</b></div>
      <div id="product-price">Price (fill me in)</div>
    </div>
  );
}

ProductInformation.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  productReviews: PropTypes.instanceOf(Object).isRequired,
  productRatings: PropTypes.instanceOf(Object).isRequired,
};

export default ProductInformation;
