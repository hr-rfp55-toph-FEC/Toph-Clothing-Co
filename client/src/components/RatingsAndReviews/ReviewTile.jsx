import React from 'react';

const ReviewTile = ({ review }) => (

  <div className="review-tile">
    {review.summary}
    <br />
    {review.body}
  </div>
);

export default ReviewTile;
