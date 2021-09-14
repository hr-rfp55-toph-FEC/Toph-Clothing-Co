import React from 'react';
import axios from 'axios';
import ReviewTile from './ReviewTile';
import SortReviews from './SortReviews';
import config from '../../config/config';

const ReviewsList = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
    };

    this.getReviews = this.getReviews.bind(this);
  }

  componentDidMount() {
    this.getReviews();
  }

  getReviews() {
    const options = {
      url: 'reviews/',
      method: 'get',
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/',
      headers: {
        Authorization: config.TOKEN,
      },
      params: {
        product_id: 40344,
      },
    };
    axios(options)
      .then((response) => {
        this.setState({ reviews: response.data.results });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { reviews } = this.state;
    let reviewDisplay;
    if (reviews.length <= 2) {
      reviewDisplay = reviews.map((review) => (
        <ReviewTile
          review={review}
          key={review.review_id}
        />
      ));
    } else {
      reviewDisplay = reviews.slice(0, 2).map((review) => (
        <ReviewTile
          review={review}
          key={review.review_id}
        />
      ));
    }

    return (
      <div className="reviews-list">
        <h3>
          {reviews.length}
          {' '}
          reviews, sorted by
          {' '}
          <SortReviews />
        </h3>
        {reviewDisplay}
        <div className="buttons-container">
          <button type="button">more reviews</button>
          <button type="submit">add a review</button>
        </div>
      </div>
    );
  }
};

export default ReviewsList;
