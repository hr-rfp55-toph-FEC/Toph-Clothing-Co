import React from 'react';
import PropTypes from 'prop-types';
import ReviewStars from './ReviewStars';

const ReviewTile = ({ review }) => {
  const readableDate = new Date(review.date);

  return (
    <div className="review-tile">
      <div className="review-heading">
        <span className="review-stars" id={review.review_id}>
          <ReviewStars rating={review.rating} id={review.review_id} />
        </span>
        <span className="reviewer-info">
          {review.reviewer_name}
          <>, </>
          {readableDate.toDateString().slice(4)}
        </span>
      </div>
      <div className="review-content">
        <div className="review-summary">{review.summary}</div>
        <div className="review-body">{review.body}</div>
      </div>
    </div>
  );
};

ReviewTile.propTypes = {
  // review: PropTypes.instanceOf(Object).isRequired,
  review: PropTypes.shape({
    body: PropTypes.string,
    date: PropTypes.string,
    helpfulness: PropTypes.number,
    photos: PropTypes.instanceOf(Array),
    rating: PropTypes.number,
    recommend: PropTypes.bool,
    review_id: PropTypes.number,
    reviewer_name: PropTypes.string,
    summary: PropTypes.string,
  }).isRequired,
};

export default ReviewTile;
