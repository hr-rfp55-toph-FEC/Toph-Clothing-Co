import React from 'react';
import axios from 'axios';

const Ratings = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className="ratings-details">
        <div className="product-rating-w-stars">
          <div>product avg rating </div>
          stars
        </div>
        <div>
          % of reviews that recommend this product
        </div>
        <div>
          a list of stars breakdown from 5 to 1 stars
        </div>
        <div>
          size
        </div>
        <div>
          comfort
        </div>
      </div>
    );
  }
};

export default Ratings;
