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

  const labels = {
    1: 'Poor', 2: 'Fair', 3: 'Average', 4: 'Good', 5: 'Great',
  };

  const [showStarLabel, setShowStarLabel] = useState(false);
  const [clickedStar, setClickedStar] = useState(0);

  const handleRatingClick = (id) => {
    setInnerWidth(String(id * 20).concat('%'));
    setShowStarLabel(true);
    setClickedStar(id);
  };

  let starLabel;
  if (showStarLabel) {
    starLabel = (
      <span className="new-review-stars-label">
        {clickedStar === 1 ? `${clickedStar} star` : `${clickedStar} stars`}
        {' - '}
        {labels[clickedStar]}
      </span>
    );
  }

  const [recommendProduct, setRecommendProduct] = useState(false);

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
        <form id="add-review-form">
          <label>
            Overall rating*
            <div>
              <div className="stars-outer new-review-stars">
                {starIds.map((id) => (
                  <i
                    className="far fa-star"
                    key={id}
                    onClick={() => handleRatingClick(id)}
                    role="presentation"
                  />
                ))}
                <div className="stars-inner new-review-stars" style={innerStarStyle}>
                  {starIds.map((id) => (
                    <i
                      className="fas fa-star"
                      key={id}
                      onClick={() => handleRatingClick(id)}
                      role="presentation"
                    />
                  ))}
                </div>
              </div>
              {starLabel}
            </div>
          </label>
          <div id="recommend-product">
            <label>
              Do you recommend this product?*
              <input type="radio" name="recommendation" value="true" onClick={() => setRecommendProduct(true)} />
              <label htmlFor="yes">Yes</label>
              <input type="radio" name="recommendation" value="false" onClick={() => setRecommendProduct(false)} />
              <label htmlFor="no">No</label>
            </label>
          </div>
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

// const handleStarHover = (id) => {
//   // console.log('mouse over');
//   setInnerWidth(String(id * 20).concat('%'));
// };

// const handleMouseLeave = () => {
//   // console.log('mouse left');
//   // event.target.style.width = '0%';
//   // setInnerWidth('0%');
// };

// onMouseEnter={() => handleStarHover(id)}
// onMouseLeave={() => handleMouseLeave()}
