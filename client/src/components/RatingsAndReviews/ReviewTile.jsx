import React from 'react';

const ReviewTile = ({ review }) => (

  <div className="review-tile">
    {review.rating}
    {review.summary}
    {review.body}
  </div>
);

export default ReviewTile;
