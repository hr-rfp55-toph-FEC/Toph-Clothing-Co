import React from 'react';
import PropTypes from 'prop-types';
import Stars from '../Stars';
import calcAvgRating from '../helpers/calcAvgRating';

const ListCard = ({ prodInfo, prodStyles, prodMeta, children }) => {
  const origPrice = prodStyles.results[0].original_price;
  const salePrice = prodStyles.results[0].sale_price;

  return (
    <div className="product-list-card">
      <div className="card-image-container">
        { children }
        <img
          src={prodStyles.results[0].photos[0].url}
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
        && <Stars id={`BG${prodMeta.product_id}`} rating={calcAvgRating(prodMeta.ratings)} />}
      </div>
    </div>
  );
};

ListCard.propTypes = {
  prodInfo: PropTypes.instanceOf(Object).isRequired,
  prodStyles: PropTypes.instanceOf(Object).isRequired,
  prodMeta: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
};

export default ListCard;
