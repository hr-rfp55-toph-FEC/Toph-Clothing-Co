import React from 'react';

const ProductListCard = ({prodInfo, prodStyles, prodMeta}) => {
  console.log(prodInfo, prodStyles, prodMeta);
  return (
    <div className="product-list-card">
      <div className="card-image-container">
        <img
          src={prodStyles.results[0].photos[0].url}
          alt="model-in-clothing"
        />

      </div>

      <div className="card-details-container">
        <h5 className="category-heading">
          {prodInfo.category}
        </h5>
        <p>{prodInfo.name}</p>
        <span>
          $
          {prodInfo.default_price}
        </span>
        <div>-- Rating Stars here -- </div>
      </div>
    </div>
  );
};

export default ProductListCard;
