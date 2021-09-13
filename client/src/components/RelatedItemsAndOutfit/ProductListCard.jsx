import React from 'react';

const ProductListCard = (props) => {
  const placeholder = props;
  return (
    <div className="product-list-card">
      <div className="card-image-container">
        Fixed size image to keep content the same below

      </div>

      <div className="card-details-container">
        <h5 className="category-heading">Category</h5>
        <p>Expanded Product Name with Extra Text</p>
        <span>$100</span>
        <div>Rating Stars</div>
      </div>
    </div>
  );
};

export default ProductListCard;
