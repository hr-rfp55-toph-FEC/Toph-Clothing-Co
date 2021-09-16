// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import Stars from '../Stars';

function ProductInformation(props) {
  const {
    product,
    productReviews,
    productStyles,
    productStarRatings,
  } = props;

  const origPrice = productStyles.results[2].original_price;
  const salePrice = productStyles.results[2].sale_price;

  return (
    <div id="product-information" className="product-right-component">
      <div id="product-rating">
        <Stars rating={productStarRatings} id={`DH-${product.id}`} />
        <a id="product-reviews" href="#bottom">
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
  productStyles: PropTypes.instanceOf(Object).isRequired,
  productStarRatings: PropTypes.number.isRequired,
};

export default ProductInformation;
