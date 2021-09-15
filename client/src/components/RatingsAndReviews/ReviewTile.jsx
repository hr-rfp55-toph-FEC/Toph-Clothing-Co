import React from 'react';
import PropTypes from 'prop-types';
import Stars from '../Stars';

const ReviewTile = ({ review }) => {
  let readableDate = new Date(review.date);
  readableDate = readableDate.toDateString().slice(4);
  const reviewMonthDay = readableDate.slice(0, -5);
  const reviewYear = readableDate.slice(-4);
  const displayUser = review.reviewer_name.concat(', ', reviewMonthDay, ', ', reviewYear);

  let displaySummary;
  let extraSummaryinBody;
  if (review.summary.length <= 60) {
    displaySummary = review.summary;
  } else {
    displaySummary = review.summary.slice(0, 57).concat('...');
    extraSummaryinBody = '...'.concat(review.summary.slice(57));
  }

  return (
    <div className="review-tile">
      <div className="review-heading">
        <span className="review-stars">
          <Stars rating={review.rating} id={`r${review.review_id}`} />
        </span>
        <span className="reviewer-info">
          {displayUser}
        </span>
      </div>
      <div className="review-content">
        <div className="review-summary">{displaySummary}</div>
        <div className="review-body">
          {extraSummaryinBody}
          <br />
          {review.body}
        </div>
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
