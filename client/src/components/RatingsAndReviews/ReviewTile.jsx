import React from 'react';

const ReviewTile = (props) => {
  const { review } = props;
  const readableDate = new Date(review.date);

  return (
    <div className="review-tile">
      {review.rating}
      {review.reviewer_name}{', '}
      {readableDate.toDateString().slice(4)}
      <br />
      {review.summary}
      <br />
      {review.body}
    </div>
  );
};

export default ReviewTile;
