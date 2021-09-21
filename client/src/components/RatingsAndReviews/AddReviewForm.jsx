import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddReviewForm = ({ productInfo, showAddReviewModal, closeReviewFormHandler }) => {
  const starIds = [1, 2, 3, 4, 5];
  let reviewFormClass = 'review-form-container';

  if (showAddReviewModal) {
    reviewFormClass = 'review-form-container show-review-form';
  }

  const [innerWidth, setInnerWidth] = useState('0%');
  const innerStarStyle = {
    width: innerWidth,
  };

  const handleStarHover = (id) => {
    // console.log(`moused over star ${id}`);
    setInnerWidth(String(id * 20).concat('%'));
  };

  const handleMouseLeave = () => {
    // console.log('mouse left star');
    setInnerWidth('0%');
  };

  return (
    <div className={reviewFormClass}>
      <div className="review-form-content">
        <span className="close-modal" onClick={closeReviewFormHandler} role="presentation"><i className="fas fa-times" /></span>
        <h1 className="review-form-title">Write Your Review</h1>
        <h3>
          About the
          {' '}
          {productInfo.name}
        </h3>
        <div className="pending-stars">
          <div className="stars-outer">
            {starIds.map((id) => (
              <i
                className="far fa-star"
                key={id}
                onFocus={() => handleStarHover(id)}
                onMouseOver={() => handleStarHover(id)}
                onMouseLeave={handleMouseLeave}
              />
            ))}
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
    </div>
  );
};

AddReviewForm.propTypes = {
  productInfo: PropTypes.instanceOf(Object).isRequired,
  showAddReviewModal: PropTypes.bool.isRequired,
  closeReviewFormHandler: PropTypes.instanceOf(Function).isRequired,
};

export default AddReviewForm;
