import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import ReviewTile from './ReviewTile';
import SortReviews from './SortReviews';
import AddReviewForm from './AddReviewForm';

const ReviewsList = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
      display: [],
      sortBy: 'relevant',
      reviewCount: 2,
      productInfo: {},
      showMoreReviewsButton: false,
      showAddReviewModal: false,
    };

    this.getReviews = this.getReviews.bind(this);
    this.updateDisplay = this.updateDisplay.bind(this);
    this.handleMoreReviews = this.handleMoreReviews.bind(this);
    this.sortClickHandler = this.sortClickHandler.bind(this);
    this.addReviewClickHandler = this.addReviewClickHandler.bind(this);
    this.getProductInfo = this.getProductInfo.bind(this);
  }

  componentDidMount() {
    this.getReviews();
    this.getProductInfo();
  }

  componentDidUpdate(prevProps, prevState) {
    const { sortBy } = this.state;
    const { starFilter } = this.props;
    if (sortBy !== prevState.sortBy || starFilter.length !== prevProps.starFilter.length) {
      this.updateDisplay();
    }
  }

  handleMoreReviews() {
    this.setState((prevState) => ({ reviewCount: prevState.reviewCount + 2 }), this.updateDisplay);
  }

  getReviews() {
    const { productId } = this.props;
    axios.get('/reviews', {
      params: {
        product_id: productId,
        count: 100,
      },
    })
      .then((response) => {
        this.setState({ reviews: response.data.results }, this.updateDisplay);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getProductInfo() {
    const { productId } = this.props;
    axios.get(`/products/${productId}`)
      .then((res) => {
        this.setState({ productInfo: res.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  updateDisplay() {
    // This function processes the reviews to be displayed on the page by editing the API response
    // It first processes any star filter (if present)
    // After applying star filters, it will sort the array based on selected sort by option
    const { reviews, reviewCount, sortBy } = this.state;
    const { starFilter } = this.props;

    let processed = [];

    // First, see if any star filters are applied
    // If no filter, display all reviews sent back by server, 2 at a time
    if (starFilter.length === 0) {
      if (reviews.length <= 2) {
        processed = reviews;
      } else {
        processed = reviews.slice(0, reviewCount);
        if (reviewCount < reviews.length) {
          this.setState({ showMoreReviewsButton: true });
        } else {
          this.setState({ showMoreReviewsButton: false });
        }
      }
    } else {
      // When there are star filters
      // Only display reviews that match the star counts
      starFilter.forEach((starCount) => {
        processed = processed.concat(reviews.filter((review) => review.rating === starCount));
      });
      this.setState({ showMoreReviewsButton: false });
    }

    // After having applied star filters, sort the reviews based on sort dropdown selection
    if (sortBy === 'helpful') {
      processed.sort((a, b) => (a.helpfulness < b.helpfulness ? 1 : -1));
    }
    if (sortBy === 'newest') {
      processed.sort((a, b) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        return dateA < dateB ? 1 : -1;
      });
    }
    if (sortBy === 'relevant') {
      processed.sort((a, b) => {
        if (a.helpfulness === b.helpfulness) {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateA < dateB ? 1 : -1;
        }
        return a.helpfulness < b.helpfulness ? 1 : -1;
      });
    }

    // Finally, display the filtered & sorted array of reviews
    this.setState({ display: processed });
  }

  sortClickHandler(value) {
    this.setState({ sortBy: value });
  }

  addReviewClickHandler() {
    this.setState({ showAddReviewModal: true });
  }

  render() {
    const {
      display, reviews, showMoreReviewsButton, sortBy,
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
          {starFilter.length > 0 ? display.length : reviews.length}
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
            />
          ))}
        </div>
        <div className="buttons-container">
          {moreReviewsButton}
          <button
            type="submit"
            className="interactive-button"
            onClick={() => {
              this.addReviewClickHandler();
            }}
          >
            add a review
            <span id="plus-icon"><i className="fas fa-plus" /></span>
          </button>
        </div>
        {/* <div>
          <AddReviewForm />
        </div> */}
      </div>
    );
  }
};

ReviewsList.propTypes = {
  productId: PropTypes.number.isRequired,
  starFilter: PropTypes.instanceOf(Array).isRequired,
};

export default ReviewsList;
