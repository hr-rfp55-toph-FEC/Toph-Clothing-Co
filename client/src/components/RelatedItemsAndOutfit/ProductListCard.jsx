import React from 'react';

const ProductListCard = (props) => {
  const placeholder = props;
  return (
    <div className="product-list-card">
      <div className="card-image-container"> Image</div>
      <div className="card-details-container">Product Details</div>
    </div>
  );
};

export default ProductListCard;
