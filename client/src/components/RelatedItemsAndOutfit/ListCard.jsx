import React from 'react';
import PropTypes from 'prop-types';
import Stars from '../Stars';
import calcAvgRating from '../helpers/calcAvgRating';

const ListCard = ({
  prodInfo, prodStyles, prodMeta, onRelatedCardClick, children,
}) => {
  const origPrice = prodStyles.results[0].original_price;
  const salePrice = prodStyles.results[0].sale_price;
  const prodUrl = prodStyles.results[0].photos[0].url;

  // const imgDimensions = prodUrl ? {
  //   height: prodUrl.offsetHeight,
  //   width: prodUrl.offsetWidth,
  // } : null;
  // const rotateImage90 = { transform: 'rotate(90deg) scale(1.5)' };

  return (
    <div className="product-list-card">
      <div className="card-image-container">
        { children }
        {prodUrl ? (
          <img
            src={prodUrl}
            alt="model-in-clothing"
            className="card-image-src"
            // style={rotateImage90}
            onClick={() => onRelatedCardClick(prodInfo.id)}
            role="presentation"
          />
        ) : <i onClick={() => onRelatedCardClick(prodInfo.id)} role="presentation" className="fas fa-image card-default-image" />}

      </div>

      <div className="card-details-container">
        <h6 className="category-heading">
          {prodInfo.category}
        </h6>
        <p className="product-name-p">{prodInfo.name}</p>
        <p className="prod-price-p">
          {salePrice
            ? (
              <>
                <span className="sale-price">{`$${salePrice} `}</span>
                <span className="orig-price-strike">{`$${origPrice}`}</span>
              </>
            )
            : <span>{` $${origPrice}`}</span>}
        </p>
        <div className="rel-prod-card-stars">
          { Object.keys(prodMeta.ratings).length !== 0
          && <Stars id={`BG${prodMeta.product_id}`} rating={calcAvgRating(prodMeta.ratings)} />}
        </div>
      </div>
    </div>
  );
};

ListCard.propTypes = {
  prodInfo: PropTypes.instanceOf(Object).isRequired,
  prodStyles: PropTypes.instanceOf(Object).isRequired,
  prodMeta: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
  onRelatedCardClick: PropTypes.instanceOf(Function).isRequired,
};

export default ListCard;
