import React from 'react';
import ProductListCard from './ProductListCard';

const RelatedCarousel = ({prodsInfo, prodsStyles, prodsMeta}) => (
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

export default RelatedCarousel;
