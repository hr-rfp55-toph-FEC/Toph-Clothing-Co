import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Stars from '../Stars';
import Thumbnail from './Thumbnail';

const ReviewTile = ({ review, getReviews }) => {
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

  const [showMoreBody, setShowMoreBody] = useState(false);
  const [buttonDisplay, setButtonDisplay] = useState(true);
  let displayBody;
  let showMoreSnippet;
  if (review.body.length <= 250) {
    displayBody = review.body;
  } else {
    displayBody = review.body.slice(0, 250).concat('...');
    showMoreSnippet = <p onClick={() => { setShowMoreBody(true); setButtonDisplay(false); }} className="clicked-text" role="presentation">Show more...</p>;
  }
  if (!buttonDisplay) {
    showMoreSnippet = <></>;
  }

  let recommendProduct;
  if (review.recommend) {
    recommendProduct = (
      <p className="recommend-product">
        <i className="fas fa-check" />
        {' '}
        I recommend this product
      </p>
    );
  }

  let salesResponse;
  if (review.response) {
    salesResponse = (
      <div className="sales-response">
        <div className="response-heading">Response: </div>
        {review.response}
      </div>
    );
  }

  function markAsHelpful(reviewId) {
    axios.put(`/reviews/${reviewId}/helpful`, {
      params: {
        review_id: reviewId,
      },
    })
      .then(() => {
        getReviews();
      })
      .catch((err) => {
        console.error(err);
      });
  }
  const helpfulSection = (
    <p className="helpful-review">
      Helpful?
      {' '}
      <span className="clicked-text" onClick={() => markAsHelpful(review.review_id)} role="presentation">Yes</span>
      {' '}
      <span>
        (
        {review.helpfulness}
        )
      </span>
    </p>
  );

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
          <p>{extraSummaryinBody}</p>
          {showMoreBody ? review.body : displayBody}
          {showMoreSnippet}
          {recommendProduct}
          {salesResponse}
          <div className="review-photos">
            {review.photos.map((photo) => (
              <Thumbnail
                photo={photo}
                key={photo.id}
              />
            ))}
          </div>
          {helpfulSection}
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
    response: PropTypes.string,
    review_id: PropTypes.number,
    reviewer_name: PropTypes.string,
    summary: PropTypes.string,
  }).isRequired,
  getReviews: PropTypes.instanceOf(Function).isRequired,
};

export default ReviewTile;
