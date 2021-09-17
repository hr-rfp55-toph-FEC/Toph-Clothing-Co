import React from 'react';
import ReviewsList from './ReviewsList';
import Ratings from './Ratings';

const RatingsAndReviews = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <section id="ratings-reviews-section">
        <h4 id="ratings-reviews-title">ratings & reviews</h4>
        <div className="ratings-and-reviews">
          <div className="ratings-container">
            <Ratings />
          </div>
          <div className="reviews-container">
            <ReviewsList />
          </div>
        </div>
      </section>
    );
  }
};

export default RatingsAndReviews;
