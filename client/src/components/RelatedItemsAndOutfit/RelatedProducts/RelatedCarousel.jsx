import React from 'react';
import PropTypes from 'prop-types';
import ProductListCard from './ProductListCard';

const RelatedCarousel = ({ prodsInfo, prodsStyles, prodsMeta }) => (
  <div className="carousel-card-container">
    {prodsInfo.map((prodInfo, index) => (
      <ProductListCard
        key={prodInfo.id}
        prodInfo={prodInfo}
        prodStyles={prodsStyles[index]}
        prodMeta={prodsMeta[index]}
      />
    ))}
  </div>
);

RelatedCarousel.propTypes = {
  prodsInfo: PropTypes.instanceOf(Array).isRequired,
  prodsStyles: PropTypes.instanceOf(Array).isRequired,
  prodsMeta: PropTypes.instanceOf(Array).isRequired,
};

export default RelatedCarousel;
