import React from 'react';
import axios from 'axios';
import ReviewTile from './ReviewTile';
import SortReviews from './SortReviews';

const ReviewsList = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      display: [],
      reviewCount: 2,
      showMoreReviewsButton: false,
    };

    this.getReviews = this.getReviews.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.handleMoreReviews = this.handleMoreReviews.bind(this);
  }

  componentDidMount() {
    this.getReviews();
  }

  handleMoreReviews() {
    this.setState((prevState) => ({ reviewCount: prevState.reviewCount + 2 }), this.updateDisplay);
  }

  getReviews() {
    axios.get('/reviews', {
      params: {
        product_id: 40345,
        count: 100,
        sort: 'relevance',
      },
    })
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
      if (reviewCount < reviews.length) {
        this.setState({ showMoreReviewsButton: true });
      } else {
        this.setState({ showMoreReviewsButton: false });
      }
    }
    this.setState({ display: reviewsCopy });
  }

  render() {
    const { display, reviews, showMoreReviewsButton } = this.state;
    let moreReviewsButton;
    if (showMoreReviewsButton) {
      moreReviewsButton = <button type="button" id="more-reviews" onClick={this.handleMoreReviews}>more reviews</button>;
    } else {
      moreReviewsButton = <p />;
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
        <div className="reviews-list-container">
          {display.map((review) => (
            <ReviewTile
              review={review}
              key={review.review_id}
            />
          ))}
        </div>
        <div className="buttons-container">
          {moreReviewsButton}
          <button type="submit" id="add-a-review">add a review</button>
        </div>
      </div>
    );
  }
};

export default ReviewsList;
