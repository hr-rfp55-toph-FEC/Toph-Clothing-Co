import React from 'react';
import ReviewsList from './ReviewsList';
import Ratings from './Ratings';

const RatingsAndReviews = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: 40345,
    };
  }

  render() {
    const { productId } = this.state;

    return (
      <section id="ratings-reviews-section">
        <h4 id="ratings-reviews-title">ratings & reviews</h4>
        <div className="ratings-and-reviews">
          <div className="ratings-container">
            <Ratings
              productId={productId}
            />
          </div>
          <div className="reviews-container">
            <ReviewsList
              productId={productId}
            />
          </div>
        </div>
      </section>
    );
  }
};

export default RatingsAndReviews;
