import React from 'react';
import PropTypes from 'prop-types';
import OutfitListCard from './OutfitListCard';

const OutfitCarousel = ({ prodsInfo, prodsStyles, prodsMeta }) => (
  <div className="carousel-card-container">
    {prodsInfo.map((prodInfo, index) => (
      <OutfitListCard
        key={prodInfo.id}
        prodInfo={prodInfo}
        prodStyles={prodsStyles[index]}
        prodMeta={prodsMeta[index]}
      />
    ))}
  </div>
);

OutfitCarousel.propTypes = {
  prodsInfo: PropTypes.instanceOf(Object).isRequired,
  prodsStyles: PropTypes.instanceOf(Object).isRequired,
  prodsMeta: PropTypes.instanceOf(Object).isRequired,
};

export default OutfitCarousel;
