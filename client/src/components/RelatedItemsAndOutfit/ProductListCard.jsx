import React, { useState } from 'react';
import Stars from '../Stars';


const ProductListCard = ({prodInfo, prodStyles, prodMeta}) => {
  const origPrice = prodStyles.results[2].original_price;
  const salePrice = prodStyles.results[2].sale_price;
  const calcAvgRating = () => {

  };

  return (
    <div className="product-list-card">
      <div className="card-image-container">
        <img
          src={prodStyles.results[2].photos[0].url}
          alt="model-in-clothing"
        />

      </div>

      <div className="card-details-container">
        <h6 className="category-heading">
          {prodInfo.category}
        </h6>
        <p className="product-details">
          {prodInfo.name}
          <br />
          {salePrice
            ? (
              <>
                <span className="sale-price">{`$${salePrice} `}</span>
                <span className="orig-price-strike">{`$${origPrice}`}</span>
              </>
            )
            : <span>{` $${origPrice}`}</span>}
          <br />
        </p>
        <Stars id={prodMeta.product_id} rating={5 * Math.random()} />
      </div>
    </div>
  );
};

export default ProductListCard;
