import React from 'react';

const ReviewTile = (props) => {
  const { review } = props;
  return (
    <div className="review-tile">
      {review.summary}
      <br />
      {review.body}
    </div>
  );
};

export default ReviewTile;
