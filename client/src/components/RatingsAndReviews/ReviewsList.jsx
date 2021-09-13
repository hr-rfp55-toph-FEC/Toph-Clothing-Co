import React from 'react';
import axios from 'axios';
import ReviewTile from './ReviewTile';

const ReviewsList = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
    };

    this.getReviews = this.getReviews.bind(this);
  }

  getReviews () {

  }

  render() {
    return (
      <div className="reviews-list">
        {this.state.reviews.map((review) => <ReviewTile review={review} />)}
      </div>
    );
  }
};

export default ReviewsList;
