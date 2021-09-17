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
    this.sortClickHandler = this.sortClickHandler.bind(this);
    this.sortReviewsByHelpful = this.sortReviewsByHelpful.bind(this);
    this.sortReviewsByNewest = this.sortReviewsByNewest.bind(this);
    this.sortReviewsByRelevant = this.sortReviewsByRelevant.bind(this);
  }

  componentDidMount() {
    const { sortBy } = this.state;
    this.getReviews(sortBy);
  }

  componentDidUpdate(prevProps, prevState) {
    const { sortBy } = this.state;
    // console.log(`previous sort: ${prevState.sortBy}`);
    if (sortBy !== prevState.sortBy) {
      // console.log(`sort option updated! now sorting by ${sortBy}`);
      if (sortBy === 'helpful') {
        this.sortReviewsByHelpful(this.updateDisplay);
      }
      if (sortBy === 'newest') {
        this.sortReviewsByNewest(this.updateDisplay);
      }
      if (sortBy === 'relevant') {
        this.sortReviewsByRelevant(this.updateDisplay);
      }
    }
  }

  handleMoreReviews() {
    this.setState((prevState) => ({ reviewCount: prevState.reviewCount + 2 }), this.updateDisplay);
  }

  getReviews(sortBy) {
    axios.get('/reviews', {
      params: {
        product_id: 40344,
        count: 100,
        sort: sortBy,
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

  sortClickHandler(value) {
    this.setState({ sortBy: value });
  }

  sortReviewsByHelpful(callback) {
    const { reviews } = this.state;
    const reviewsCopy = reviews.slice();
    reviewsCopy.sort((a, b) => (a.helpfulness < b.helpfulness ? 1 : -1));
    this.setState({ reviews: reviewsCopy }, callback);
  }

  sortReviewsByNewest(callback) {
    const { reviews } = this.state;
    const reviewsCopy = reviews.slice();
    reviewsCopy.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateA < dateB ? 1 : -1;
    });
    this.setState({ reviews: reviewsCopy }, callback);
  }

  sortReviewsByRelevant(callback) {
    const { reviews } = this.state;
    const reviewsCopy = reviews.slice();
    reviewsCopy.sort((a, b) => {
      if (a.helpfulness === b.helpfulness) {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA < dateB ? 1 : -1;
      }
      return a.helpfulness < b.helpfulness ? 1 : -1;
    });
    this.setState({ reviews: reviewsCopy }, callback);
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
            sortClickHandler={this.sortClickHandler}
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
