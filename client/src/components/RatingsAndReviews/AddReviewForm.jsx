import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddReviewForm = ({ productInfo }) => {
  const [innerWidth, setInnerWidth] = useState('0');
  const innerStarStyle = {
    width: innerWidth,
  };

  return (
    <div className="review-form-container">
      <h1>Write Your Review</h1>
      <h3>
        About the
        {' '}
        {productInfo.name}
      </h3>
      <div className="pending-stars">
        <div className="stars-outer">
          <i className="far fa-star" />
          <i className="far fa-star" />
          <i className="far fa-star" />
          <i className="far fa-star" />
          <i className="far fa-star" />
          <div className="stars-inner" style={innerStarStyle}>
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
            <i className="fas fa-star" />
          </div>
        </div>
      </div>
      <form>
        <label>
          Name:
          <input type="text" name="name" />
        </label>
      </form>
    </div>
  );
};

AddReviewForm.propTypes = {
  productInfo: PropTypes.instanceOf(Object).isRequired,
};

export default AddReviewForm;
