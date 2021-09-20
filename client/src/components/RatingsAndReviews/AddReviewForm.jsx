import React from 'react';

const AddReviewForm = () => {
  const innerStarWidth = {
    width: '50%',
  };

  return (
    <div className="review-form-container">
      <div className="pending-stars">
        <div className="stars-outer">
          <i className="far fa-star" />
          <i className="far fa-star" />
          <i className="far fa-star" />
          <i className="far fa-star" />
          <i className="far fa-star" />
          <div className="stars-inner" style={innerStarWidth}>
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
