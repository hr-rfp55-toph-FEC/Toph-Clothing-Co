import React, { useState, useEffect } from 'react';
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

  const [mouseOnStar, setMouseOnStar] = useState(false);
  const handleStarHover = (id) => {
    console.log('mouse over');
    setInnerWidth(String(id * 20).concat('%'));
  };

  const handleMouseLeave = () => {
    console.log('mouse left');
    // event.target.style.width = '0%';
    // e.target.style.width
    // setInnerWidth('0%');
  };

  const handleRatingClick = (id) => {
    setInnerWidth(String(id * 20).concat('%'));
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
        <div className="new-review-stars">
          <div className="stars-outer new-review-stars">
            {starIds.map((id) => (
              <i
                className="far fa-star"
                id={id}
                key={id}
                // onFocus={() => handleStarHover(id)}
                onMouseEnter={() => handleStarHover(id)}
                onMouseLeave={() => handleMouseLeave()}
                onClick={() => handleRatingClick(id)}
                role="presentation"
              />
            ))}
            <div className="stars-inner new-review-stars" style={innerStarStyle}>
              {starIds.map((id) => (
                <i
                  className="fas fa-star"
                  id={id}
                  key={id}
                  onClick={() => handleRatingClick(id)}
                  role="presentation"
                />
              ))}
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
