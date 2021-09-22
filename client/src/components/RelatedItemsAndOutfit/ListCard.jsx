import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Stars from '../Stars';
import calcAvgRating from '../helpers/calcAvgRating';

const ListCard = ({
  prodInfo, prodStyles, prodMeta, changeProductHandler, children,
}) => {
  const origPrice = prodStyles.original_price;
  const salePrice = prodStyles.sale_price;
  const prodUrl = prodStyles.photos[0].url;
  const styleName = prodStyles.name;
  const [rotateImage, setRotateImage] = useState(false);

  const rotateStyle = rotateImage ? {
    transform: 'rotate(90deg) scale(1.5)',
    backgroundImage: `url('${prodUrl}')`,
  } : { backgroundImage: `url('${prodUrl}')` };

  // console.log(rotateStyle, newImage.width, newImage.height);
  useEffect(() => {
    // console.log('mounted');
    const newImage = new Image();
    newImage.src = prodUrl;
    // console.log(prodUrl, newImage.naturalHeight, newImage.naturalWidth);
    if (newImage.naturalHeight < newImage.naturalWidth) {
      setRotateImage(true);
    }
  }, [prodUrl]);
  return (
    <div className="product-list-card">
      <div className="card-image-container">
        { children }
        {prodUrl ? (
          <div
            // src={prodUrl}
            key={prodUrl}
            alt="model-in-clothing"
            className="card-image-src"
            style={rotateStyle}
            onClick={() => changeProductHandler(prodInfo.id)}
            role="presentation"
          />
        ) : <i onClick={() => changeProductHandler(prodInfo.id)} role="presentation" className="fas fa-image card-default-image" />}

      </div>

      <div className="card-details-container">
        <h6 className="category-heading">
          {prodInfo.category}
        </h6>
        <p className="product-name-p">
          {prodInfo.name}
          <br />
          <span className="style-name-span">
            {`(${styleName})`}
          </span>
        </p>
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
          && <Stars id={`BG${prodMeta.product_id}${Math.random() * 10000}`} rating={calcAvgRating(prodMeta.ratings)} />}
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
  changeProductHandler: PropTypes.func.isRequired,
};

export default ListCard;
