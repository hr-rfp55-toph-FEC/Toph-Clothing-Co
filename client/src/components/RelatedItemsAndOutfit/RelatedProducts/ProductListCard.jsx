import React from 'react';
import Stars from '../../Stars';

const ProductListCard = ({prodInfo, prodStyles, prodMeta}) => {
  const origPrice = prodStyles.results[2].original_price;
  const salePrice = prodStyles.results[2].sale_price;

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
    //this will do something for ProductListCards
  };
  return (
    <div className="product-list-card">
      <div className="card-image-container">
        <button onClick={onClickHandler} type="button" className="card-button">X</button>
        <img
          src={prodStyles.results[2].photos[0].url}
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
        && <Stars id={`BG${prodMeta.product_id}`} rating={calcAvgRating(prodMeta)} />}
      </div>
    </div>
  );
};

export default ProductListCard;
