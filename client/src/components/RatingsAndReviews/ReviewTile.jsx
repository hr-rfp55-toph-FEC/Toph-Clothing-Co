import React from 'react';

const ReviewTile = ({ review }) => (

  <div className="review-tile">
    {review.summary}
  </div>
);

export default ReviewTile;
