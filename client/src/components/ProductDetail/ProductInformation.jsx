// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

function ProductInformation(props) {
  const { product } = props;

  return (
    <div>
      Product Information
      <div id="product-rating">Star Rating (fill me in) Read all [#] reviews</div>
      <div id="product-category">{product.category}</div>
      <div id="product-name">{product.name}</div>
      <div id="product-price">Price (fill me in)</div>
    </div>
  );
}

ProductInformation.propTypes = {
  product: PropTypes.shape.isRequired,
};

export default ProductInformation;
