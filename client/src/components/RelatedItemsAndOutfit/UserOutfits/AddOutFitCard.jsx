import React from 'react';
import PropTypes from 'prop-types';

const AddOutfitCard = ({ addToCurrOutfits }) => (
  <div className="product-list-card">
    <div className="card-image-container">
      <button onClick={addToCurrOutfits} type="button" className="card-button">+</button>
    </div>
    <div className="card-details-container">
      <h6 className="category-heading">
        ADD CURRENT PRODUCT TO OUTFIT
      </h6>
      <p className="product-details">
      </p>
    </div>
  </div>
);

AddOutfitCard.propTypes = {
  addToCurrOutfits: PropTypes.instanceOf(Function).isRequired,
};

export default AddOutfitCard;
