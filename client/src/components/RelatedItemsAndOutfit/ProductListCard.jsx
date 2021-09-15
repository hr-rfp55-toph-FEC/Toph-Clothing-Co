import React, { useState } from 'react';

const ProductListCard = ({prodInfo, prodStyles, prodMeta}) => {
  const origPrice = prodStyles.results[2].original_price;
  const salePrice = prodStyles.results[2].sale_price;
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
              <p>
                <span className="sale-price">{`$${salePrice} `}</span>
                <span className="orig-price-strike">{`$${origPrice}`}</span>
              </p>
            )
            : <p>{` $${origPrice}`}</p>}
          <br />
          -- Rating Stars here --
        </p>
      </div>
    </div>
  );
};

export default ProductListCard;
