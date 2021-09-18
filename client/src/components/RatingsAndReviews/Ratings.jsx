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
      ratingBreakdown: [],
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

    let productRating;
    let recommendPercentage;
    let totalRatingsCount;
    let ratingsWithPercentage;

    let ratings = Object.entries(metaData.ratings).reverse();
    if (ratings.length < 5) {
      const allStars = [1, 2, 3, 4, 5].map((number) => String(number));
      const absent = allStars.filter((num) => !Object.keys(metaData.ratings).includes(num));
      absent.forEach((num) => {
        ratings.push([num, '0']);
      });
    }
    ratings.sort((a, b) => (a[0] < b[0] ? 1 : -1));

    if (Object.keys(metaData.ratings).length > 0) {
      productRating = calcAvgRating(metaData.ratings).toFixed(1);
      recommendPercentage = ((Number(metaData.recommended.true)
        / (Number(metaData.recommended.false) + Number(metaData.recommended.true))) * 100).toFixed(0);
      totalRatingsCount = Object.values(metaData.ratings)
        .map((item) => Number(item))
        .reduce((acc, item) => (acc + item));

      ratingsWithPercentage = ratings
        .map((rating) => ([rating[0], rating[1], ((Number(rating[1]) / totalRatingsCount) * 100).toFixed(0).concat('%')]));
    } else {
      productRating = 0;
      recommendPercentage = 0;
      ratingsWithPercentage = ratings
        .map((rating) => ([rating[0], rating[1], '0%']));
    }

    this.setState({
      avgRating: productRating,
      recommended: recommendPercentage,
      ratingBreakdown: ratingsWithPercentage,
    });
  }

  render() {
    const {
      avgRating, recommended, metaData, ratingBreakdown,
    } = this.state;

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
            ratings={ratingBreakdown}
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
