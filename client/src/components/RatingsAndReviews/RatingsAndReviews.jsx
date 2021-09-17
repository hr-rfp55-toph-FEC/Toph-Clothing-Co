import React from 'react';
import ReviewsList from './ReviewsList';

const RatingsAndReviews = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <section className="ratings-reviews" id="ratings-reviews-section">
        <h4 className="ratings-reviews-title">ratings & reviews</h4>
        <div className="ratings-reviews-container">
          <ReviewsList />
        </div>
      </section>
    );
  }
};

export default RatingsAndReviews;
