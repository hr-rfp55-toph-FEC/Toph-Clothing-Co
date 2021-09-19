import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ReviewTile from './ReviewTile';
import SortReviews from './SortReviews';

const ReviewsList = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      display: [],
      filtered: [],
      sortBy: 'relevant',
      reviewCount: 2,
      showMoreReviewsButton: false,
    };

    this.getReviews = this.getReviews.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.handleMoreReviews = this.handleMoreReviews.bind(this);
    this.sortClickHandler = this.sortClickHandler.bind(this);
    this.sortByOption = this.sortByOption.bind(this);
    this.filterByStar = this.filterByStar.bind(this);
    this.resetFiltered = this.resetFiltered.bind(this);
  }

  componentDidMount() {
    const { sortBy } = this.state;
    this.getReviews(sortBy);
  }

  componentDidUpdate(prevProps, prevState) {
    const { sortBy } = this.state;
    const { starFilter } = this.props;
    if (sortBy !== prevState.sortBy) {
      this.sortByOption(sortBy, this.updateDisplay);
    }
    if (starFilter.length !== prevProps.starFilter.length) {
      this.filterByStar(this.updateDisplay);
      if (starFilter.length === 0) {
        this.resetFiltered();
      }
    }
  }

  handleMoreReviews() {
    this.setState((prevState) => ({ reviewCount: prevState.reviewCount + 2 }), this.updateDisplay);
  }

  getReviews(sortBy) {
    const { productId } = this.props;
    axios.get('/reviews', {
      params: {
        product_id: productId,
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
    const { reviews, filtered, reviewCount } = this.state;
    let reviewsCopy = [];
    const { starFilter } = this.props;

    if (starFilter.length === 0) {
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
    } else {
      reviewsCopy = filtered;
      this.setState({ showMoreReviewsButton: false });
    }

    this.setState({ display: reviewsCopy });
  }

  sortClickHandler(value) {
    this.setState({ sortBy: value });
  }

  sortByOption(option, callback) {
    const { reviews, filtered } = this.state;
    let reviewsCopy;
    if (filtered.length > 0) {
      reviewsCopy = filtered.slice();
    } else {
      reviewsCopy = reviews.slice();
    }

    if (option === 'helpful') {
      reviewsCopy.sort((a, b) => (a.helpfulness < b.helpfulness ? 1 : -1));
    }
    if (option === 'newest') {
      reviewsCopy.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA < dateB ? 1 : -1;
      });
    }
    if (option === 'relevant') {
      reviewsCopy.sort((a, b) => {
        if (a.helpfulness === b.helpfulness) {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA < dateB ? 1 : -1;
        }
        return a.helpfulness < b.helpfulness ? 1 : -1;
      });
    }
    if (filtered.length > 0) {
      this.setState({ filtered: reviewsCopy }, callback);
    } else {
      this.setState({ reviews: reviewsCopy }, callback);
    }
  }

  filterByStar(callback) {
    const { reviews } = this.state;
    const { starFilter } = this.props;

    let reviewsCopy = [];
    if (starFilter.length === 0) {
      reviewsCopy = reviews.slice();
    } else {
      starFilter.forEach((starCount) => {
        reviewsCopy = reviewsCopy.concat(reviews.filter((review) => review.rating === starCount));
      });
    }
    this.setState({ filtered: reviewsCopy }, callback);
  }

  resetFiltered() {
    this.setState({ filtered: [] });
  }

  render() {
    const {
      display, reviews, showMoreReviewsButton, sortBy, filtered,
    } = this.state;
    const { starFilter } = this.props;

    let moreReviewsButton;
    if (showMoreReviewsButton) {
      moreReviewsButton = <button type="button" className="interactive-button" onClick={this.handleMoreReviews}>more reviews</button>;
    } else {
      moreReviewsButton = <p />;
    }

    return (
      <div className="reviews-list">
        <h3>
          {starFilter.length > 0 ? filtered.length : reviews.length}
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
          <button type="submit" className="interactive-button">
            add a review
            <span id="plus-icon"><i className="fas fa-plus" /></span>
          </button>
        </div>
      </div>
    );
  }
};

ReviewsList.propTypes = {
  productId: PropTypes.number.isRequired,
  starFilter: PropTypes.instanceOf(Array).isRequired,
};

export default ReviewsList;
