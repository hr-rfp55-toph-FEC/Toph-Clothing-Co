import React from 'react';
import OutfitListCard from './OutfitListCard';

const OutfitCarousel = ( {prodsInfo, prodsStyles, prodsMeta} ) => (
  <div className="carousel-card-container">
    {prodsInfo.map((prod, index) => (
      <OutfitListCard
        key={prod.id}
        prodInfo={prod}
        prodStyles={prodsStyles[index]}
        prodMeta={prodsMeta[index]}
      />
    ))}
  </div>
);

export default OutfitCarousel;
