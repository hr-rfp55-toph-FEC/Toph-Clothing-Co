import React from 'react';
import PropTypes from 'prop-types';
import Stars from '../../Stars';

const UserListCard = ({ prodInfo, prodStyles, prodMeta }) => {
  const origPrice = prodStyles.results[1].original_price;
  const salePrice = prodStyles.results[1].sale_price;
  const calcAvgRating = (metaData) => {
    const { ratings } = metaData;
    if (!Object.keys(ratings).length) {
      return 0;
    }
    const weights = Object.keys(ratings);
    const rates = Object.values(ratings);
    let weightedSum = 0;
    let totalRates = 0;
    weights.forEach((weight, index) => {
      weightedSum += weight * rates[index];
      totalRates += Number(rates[index]);
    });
    return weightedSum / totalRates;
  };

  const onClickHandler = (e) => {
    //doSomethingUserRelated
  };
  return (
    <div className="product-list-card">
      <div className="card-image-container">
        <button onClick={onClickHandler} type="button" className="card-button">+</button>
        <img
          src={prodStyles.results[1].photos[0].url}
          alt="model-in-clothing"
        />

      </div>

      <div className="card-details-container">
        <h6 className="category-heading">
          {prodInfo.category}
        </h6>
        <p className="product-details">
          {prodInfo.name}
          <br />
          {salePrice
            ? (
              <>
                <span className="sale-price">{`$${salePrice} `}</span>
                <span className="orig-price-strike">{`$${origPrice}`}</span>
              </>
            )
            : <span>{` $${origPrice}`}</span>}
          <br />
        </p>
        { Object.keys(prodMeta.ratings).length !== 0
        && <Stars id={prodMeta.product_id} rating={calcAvgRating(prodMeta)} />}
      </div>
    </div>
  );
};

UserListCard.propTypes = {
  prodInfo: PropTypes.instanceOf(Array).isRequired,
  prodStyles: PropTypes.instanceOf(Array).isRequired,
  prodMeta: PropTypes.instanceOf(Array).isRequired,
};

export default UserListCard;
