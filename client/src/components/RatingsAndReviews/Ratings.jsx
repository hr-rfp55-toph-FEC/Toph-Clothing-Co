import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import calcAvgRating from '../helpers/calcAvgRating';
import Stars from '../Stars';

const Ratings = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      metaData: {},
      avgRating: null,
    };

    this.getReviewMeta = this.getReviewMeta.bind(this);
    this.calculateRating = this.calculateRating.bind(this);
  }

  componentDidMount() {
    this.getReviewMeta();
  }

  componentDidUpdate(prevProps, prevState) {
    const { metaData } = this.state;
    if (prevState.metaData.product_id !== metaData.product_id) {
      this.calculateRating();
    }
  }

  getReviewMeta() {
    const { productId } = this.props;
    axios.get('/reviews/meta', {
      params: {
        product_id: productId,
      },
    })
      .then((response) => {
        this.setState({ metaData: response.data });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  calculateRating() {
    const { metaData } = this.state;
    const productRating = calcAvgRating(metaData.ratings).toFixed(1);
    this.setState({ avgRating: productRating });
  }

  render() {
    const { avgRating, metaData } = this.state;

    return (
      <div className="rating-breakdown">
        <div className="rating-summary">
          <div id="product-rating-score">{avgRating}</div>
          <div className="ratings-stars">
            <Stars
              rating={avgRating}
              id={`YL-${metaData.product_id}`}
            />
          </div>
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

Ratings.propTypes = {
  productId: PropTypes.number.isRequired,
};

export default Ratings;
