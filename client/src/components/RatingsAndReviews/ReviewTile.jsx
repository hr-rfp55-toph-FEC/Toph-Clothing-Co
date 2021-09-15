import React from 'react';
import PropTypes from 'prop-types';

const ReviewTile = ({ review }) => {
  const readableDate = new Date(review.date);

  return (
    <div className="review-tile">
      <div className="review-heading">
        <span className="review-stars">
          {review.rating}
          <> stars</>
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
    rating: PropTypes.number,
    date: PropTypes.string,
    reviewer_name: PropTypes.string,
    summary: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};

export default ReviewTile;
