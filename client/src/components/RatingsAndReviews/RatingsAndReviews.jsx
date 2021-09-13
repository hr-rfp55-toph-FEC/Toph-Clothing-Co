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
      <div>
        RatingsAndReviews
        <ReviewsList />
      </div>
    );
  }
};

export default RatingsAndReviews;
