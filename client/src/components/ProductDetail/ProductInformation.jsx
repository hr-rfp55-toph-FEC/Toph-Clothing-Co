// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

function ProductInformation(props) {
  const { product } = props;

  if (JSON.stringify(product) === '{}') {
    return null;
  }

  return (
    <div id="product-information">
      <div id="product-rating">
        <span id="product-stars">★★★★★</span>
        <span id="product-reviews">Read all [#] reviews (fill me in)</span>
      </div>
      <div id="product-category">{product.category.toUpperCase()}</div>
      <div id="product-name"><b>{product.name}</b></div>
      <div id="product-price">Price (fill me in)</div>
    </div>
  );
}

ProductInformation.propTypes = {
  product: PropTypes.shape.isRequired,
};

export default ProductInformation;
