import React from 'react';

const ProductListCard = ({productInfo}) => {

  console.log(productInfo);
  return (
    <div className="product-list-card">
      <div className="card-image-container">
        Fixed size image to keep content the same below

      </div>

      <div className="card-details-container">
        <h5 className="category-heading">
          {productInfo.category}
        </h5>
        <p>{productInfo.name}</p>
        <span>
          $
          {productInfo.default_price}
        </span>
        <div>Rating Stars</div>
      </div>
    </div>
  );
};

export default ProductListCard;
