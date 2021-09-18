import React from 'react';
import ReviewsList from './ReviewsList';
import Ratings from './Ratings';

const RatingsAndReviews = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      productId: 40345,
      starFilter: [],
    };

    this.handleStarClick = this.handleStarClick.bind(this);
  }

  handleStarClick(starCount) {
    const { starFilter } = this.state;
    const selectedStars = starFilter.slice();
    if (selectedStars.includes(starCount)) {
      selectedStars.splice(selectedStars.indexOf(starCount), 1);
    } else {
      selectedStars.push(starCount);
    }
    this.setState({ starFilter: selectedStars });
  }

  render() {
    const { productId, starFilter } = this.state;

    return (
      <section id="ratings-reviews-section">
        <h4 id="ratings-reviews-title">ratings & reviews</h4>
        <div className="ratings-and-reviews">
          <div className="ratings-container">
            <Ratings
              productId={productId}
              handleStarClick={this.handleStarClick}
            />
          </div>
          <div className="reviews-container">
            <ReviewsList
              productId={productId}
              starFilter={starFilter}
            />
          </div>
        </div>
      </section>
    );
  }
};

export default RatingsAndReviews;
