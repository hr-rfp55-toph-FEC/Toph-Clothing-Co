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
      sortBy: 'relevant',
      reviewCount: 2,
      showMoreReviewsButton: false,
    };

    this.getReviews = this.getReviews.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.handleMoreReviews = this.handleMoreReviews.bind(this);
    this.sortHandler = this.sortHandler.bind(this);
  }

  componentDidMount() {
    const { sortBy } = this.state;
    this.getReviews(sortBy);
  }

  componentDidUpdate(prevProps, prevState) {
    const { sortBy } = this.state;
    // console.log(prevState.sortBy);
    if (sortBy !== prevState.sortBy) {
      console.log(`new sort option! now sorting by ${sortBy}`);
      this.getReviews(sortBy);
    }
  }

  handleMoreReviews() {
    this.setState((prevState) => ({ reviewCount: prevState.reviewCount + 2 }), this.updateDisplay);
  }

  getReviews(sortBy) {
    axios.get('/reviews', {
      params: {
        product_id: 40347,
        count: 100,
        sort: sortBy,
      },
    })
      .then((response) => {
        console.log(`got reviews! sorted by: ${sortBy}`);
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

  sortHandler(value) {
    this.setState({ sortBy: value }, this.getReviews(value));
  }

  render() {
    const {
      display, reviews, showMoreReviewsButton, sortBy,
    } = this.state;
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
          reviews,
          {' '}
          <SortReviews
            sortHandler={this.sortHandler}
            sortBy={sortBy}
          />
        </h3>
        <div className="reviews-list-container">
          {display.map((review) => (
            <ReviewTile
              review={review}
              key={review.review_id}
              getReviews={this.getReviews}
              sortBy={sortBy}
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
