import React from 'react';
import OutfitListCard from './OutfitListCard';

const Carousel = ( {isRelatedProducts, isUserOutfits, prodsInfo, prodsStyles, prodsMeta} ) => (
  <div className="carousel-card-container">
    {prodsInfo.map((prod, index) => (
      <OutfitListCard
        key={prod.id}
        isRelatedProducts={isRelatedProducts || false}
        isUserOutfits={isUserOutfits || false}
        prodInfo={prod}
        prodStyles={prodsStyles[index]}
        prodMeta={prodsMeta[index]}
      />
    ))}
  </div>
);

export default Carousel;
