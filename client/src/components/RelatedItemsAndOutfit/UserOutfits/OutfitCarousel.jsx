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
  prodsInfo: PropTypes.isInstanceOf(Array).isRequired,
  prodsStyles: PropTypes.isInstanceOf(Array).isRequired,
  prodsMeta: PropTypes.isInstanceOf(Array).isRequired,
};

export default OutfitCarousel;
