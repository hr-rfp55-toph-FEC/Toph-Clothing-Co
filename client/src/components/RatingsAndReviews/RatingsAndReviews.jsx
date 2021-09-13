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
      <div className="ratings-reviews">
        <h4>ratings & reviews</h4>
        <ReviewsList />
      </div>
    );
  }
};

export default RatingsAndReviews;
