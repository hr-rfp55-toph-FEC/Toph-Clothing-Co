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
      display: [],
      reviewCount: 2,
      showMoreReviewsButton: false
    };

    this.getReviews = this.getReviews.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
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
        this.setState({ reviews: response.data.results }, this.updateDisplay);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  updateDisplay() {
    const { reviews, reviewCount } = this.state;
    let reviewsCopy;
    if (reviews.length <= 2) {
      reviewsCopy = reviews;
    } else {
      reviewsCopy = reviews.slice(0, reviewCount);
      this.setState({ showMoreReviewsButton: true });
    }
    this.setState({ display: reviewsCopy });
  }

  render() {
    const { display, reviews } = this.state;

    return (
      <div className="reviews-list">
        <h3>
          {reviews.length}
          {' '}
          reviews, sorted by
          {' '}
          <SortReviews />
        </h3>
        {display.map((review) => (
          <ReviewTile
            review={review}
            key={review.review_id}
          />
        ))}
        <div className="buttons-container">
          <button type="button">more reviews</button>
          <button type="submit">add a review</button>
        </div>
      </div>
    );
  }
};

export default ReviewsList;
