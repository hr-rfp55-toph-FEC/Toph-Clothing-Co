import React, { useState } from 'react';

const AddReviewForm = () => {
  const [innerWidth, setInnerWidth] = useState('0');

  return (
    <div className="review-form-container">
      <div className="pending-stars">
        <div className="stars-outer">
          <i className="far fa-star" />
          <i className="far fa-star" />
          <i className="far fa-star" />
          <i className="far fa-star" />
          <i className="far fa-star" />
          <div className="stars-inner" style={innerWidth}>
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

export default AddReviewForm;
