import React from 'react';
import PropTypes from 'prop-types';

const AddOutfitCard = ({ addToCurrOutfits }) => (
  <div className="product-list-card">
    <div onClick={addToCurrOutfits} className="add-outfit-image-container">
      {/* <button onClick={addToCurrOutfits} type="button" className="card-button">
      </button> */}
      <img alt="add to output button icon" src="../../../assets/earth-symbol.png" className="add-to-outfit-button" />
      <h1 className="add-to-outfit-heading">
        ADD TO MY OUTFIT
      </h1>
    </div>


    {/* <div className="card-details-container">
      <h6 className="category-heading">
        ADD CURRENT PRODUCT TO OUTFIT
      </h6>
      <p className="product-details">
      </p>
    </div> */}
  </div>
);

AddOutfitCard.propTypes = {
  addToCurrOutfits: PropTypes.instanceOf(Function).isRequired,
};

export default AddOutfitCard;
