import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import calcAvgRating from '../helpers/calcAvgRating';
import Stars from '../Stars';
import RatingTable from './RatingTable';

const Ratings = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      metaData: {},
      avgRating: null,
      recommended: null,
    };

    this.getReviewMeta = this.getReviewMeta.bind(this);
    this.calcRatingAndRec = this.calcRatingAndRec.bind(this);
  }

  componentDidMount() {
    this.getReviewMeta();
  }

  componentDidUpdate(prevProps, prevState) {
    const { metaData } = this.state;
    if (prevState.metaData.product_id !== metaData.product_id) {
      this.calcRatingAndRec();
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

  calcRatingAndRec() {
    const { metaData } = this.state;
    const productRating = calcAvgRating(metaData.ratings).toFixed(1);
    const recommendRaw = ((Number(metaData.recommended.true)
      / (Number(metaData.recommended.false) + Number(metaData.recommended.true))) * 100).toFixed(0);
    this.setState({ avgRating: productRating, recommended: recommendRaw });
  }

// let ratingArr = Object.entries(ratings).reverse();
// const totalRatingsCount = Object.values(ratings)
//   .map((item) => Number(item))
//   .reduce((acc, item) => (acc + item));

  render() {
    const { avgRating, recommended, metaData } = this.state;

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
        <div id="recommend-percentage">
          {recommended}
          % of reviews recommend this product
        </div>
        <div id="breakdown-table">
          <RatingTable
            ratings={metaData.ratings}
          />
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
