import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import calcAvgRating from '../helpers/calcAvgRating';
import Stars from '../Stars';
import TableRow from './TableRow';
import Characteristic from './Characteristic';

const Ratings = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      metaData: {},
      avgRating: 0,
      recommended: null,
      ratingBreakdown: [],
      characteristics: [],
    };

    this.getReviewMeta = this.getReviewMeta.bind(this);
    this.calcRatingAndRec = this.calcRatingAndRec.bind(this);
    this.extractCharacteristics = this.extractCharacteristics.bind(this);
  }

  componentDidMount() {
    this.getReviewMeta();
  }

  componentDidUpdate(prevProps, prevState) {
    const { metaData } = this.state;
    if (prevState.metaData.product_id !== metaData.product_id) {
      this.calcRatingAndRec();
      this.extractCharacteristics();
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

    const ratings = Object.entries(metaData.ratings).reverse();
    if (ratings.length < 5) {
      const allStars = [1, 2, 3, 4, 5].map((number) => String(number));
      const absentStars = allStars.filter((num) => !Object.keys(metaData.ratings).includes(num));
      absentStars.forEach((num) => {
        ratings.push([num, '0']);
      });
    }
    ratings.sort((a, b) => (a[0] < b[0] ? 1 : -1));

    if (Object.keys(metaData.ratings).length > 0) {
      productRating = Number(calcAvgRating(metaData.ratings).toFixed(1));
      totalRatingsCount = Object.values(metaData.ratings)
        .map((item) => Number(item))
        .reduce((acc, item) => (acc + item));

      if (metaData.recommended.true) {
        recommendPercentage = ((Number(metaData.recommended.true)
          / totalRatingsCount) * 100).toFixed(0);
      }
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

  extractCharacteristics() {
    const { metaData } = this.state;
    const characteristicsArr = Object.entries(metaData.characteristics);
    characteristicsArr.forEach((char) => {
      const percentage = ((Number(char[1].value) / 5) * 100).toFixed(1).concat('%');
      char[1].percent = percentage;

      if (char[0] === 'Quality' || char[0] === 'Comfort') {
        char[1].scale = ['Poor', 'Okay', 'Great'];
      } else if (char[0] === 'Size' || char[0] === 'Fit') {
        char[1].scale = ['Too small', 'Perfect', 'Too Large'];
      } else if (char[0] === 'Length') {
        char[1].scale = ['Too short', 'Perfect', 'Too long'];
      } else if (char[0] === 'Width') {
        char[1].scale = ['Too narrow', 'Perfect', 'Too wide'];
      }
      return char;
    });
    this.setState({ characteristics: characteristicsArr });
  }

  render() {
    const {
      avgRating, recommended, metaData, ratingBreakdown, characteristics,
    } = this.state;

    const { handleStarClick, removeFilter, starFilter } = this.props;

    let filterMesage;
    let clearFilter;
    let displayStarFilter = '';
    starFilter.forEach((starCount) => {
      if (displayStarFilter === '') {
        displayStarFilter += `${starCount}-stars`;
      } else {
        displayStarFilter += `, ${starCount}-stars`;
      }
    });
    if (starFilter.length > 0) {
      filterMesage = (
        <div className="filter-message">
          <span id="filter-label">FILTERED BY: </span>
          <br />
          {displayStarFilter}
        </div>
      );
      clearFilter = (
        <div id="clear-filter" onClick={() => removeFilter()} role="presentation">Clear Filter</div>
      );
    }

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
          <table>
            <tbody>
              {ratingBreakdown.map((row) => (
                <TableRow
                  row={row}
                  key={`${row[0]}-stars-row`}
                  handleStarClick={handleStarClick}
                />
              ))}
            </tbody>
          </table>
          {filterMesage}
          {clearFilter}
        </div>
        <div className="characteristics-container">
          {characteristics.map((characteristic) => (
            <Characteristic
              characteristic={characteristic}
              key={characteristic[1].id}
            />
          ))}
        </div>
      </div>
    );
  }
};

Ratings.propTypes = {
  productId: PropTypes.number.isRequired,
  handleStarClick: PropTypes.instanceOf(Function).isRequired,
  removeFilter: PropTypes.instanceOf(Function).isRequired,
  starFilter: PropTypes.instanceOf(Array).isRequired,
};

export default Ratings;
