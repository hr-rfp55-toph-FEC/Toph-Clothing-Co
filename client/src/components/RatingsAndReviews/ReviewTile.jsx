import React from 'react';

const ReviewTile = ({ review }) => {
  const readableDate = new Date(review.date);

  return (
    <div className="review-tile">
      <div className="review-heading">
        {review.rating}
        stars
        {' '}
        {review.reviewer_name}
        {', '}
        {readableDate.toDateString().slice(4)}
      </div>
      <div className="review-content">
        {review.summary}
        <br />
        {review.body}
      </div>
    </div>
  );
};

export default ReviewTile;
