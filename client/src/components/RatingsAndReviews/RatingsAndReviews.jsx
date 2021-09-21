import React from 'react';
import PropTypes from 'prop-types';
import ReviewsList from './ReviewsList';
import Ratings from './Ratings';

const RatingsAndReviews = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      starFilter: [],
    };

    this.handleStarClick = this.handleStarClick.bind(this);
    this.removeFilter = this.removeFilter.bind(this);
  }

  handleStarClick(starCount) {
    const { starFilter } = this.state;
    const selectedStars = starFilter.slice();
    if (selectedStars.includes(Number(starCount))) {
      selectedStars.splice(selectedStars.indexOf(Number(starCount)), 1);
    } else {
      selectedStars.push(Number(starCount));
    }
    this.setState({ starFilter: selectedStars });
  }

  removeFilter() {
    this.setState({ starFilter: [] });
  }

  render() {
    const { starFilter } = this.state;
    const { prodInfo, prodReviews, prodReviewsMeta } = this.props;

    return (
      <section id="ratings-reviews-section">
        <h4 id="ratings-reviews-title">ratings & reviews</h4>
        <div className="ratings-and-reviews">
          <div className="ratings-container">
            <Ratings
              reviewsMeta={prodReviewsMeta}
              handleStarClick={this.handleStarClick}
              removeFilter={this.removeFilter}
              starFilter={starFilter}
            />
          </div>
          <div className="reviews-container">
            <ReviewsList
              productInfo={prodInfo}
              reviews={prodReviews}
              starFilter={starFilter}
            />
          </div>
        </div>
      </section>
    );
  }
};

RatingsAndReviews.propTypes = {

};

export default RatingsAndReviews;
