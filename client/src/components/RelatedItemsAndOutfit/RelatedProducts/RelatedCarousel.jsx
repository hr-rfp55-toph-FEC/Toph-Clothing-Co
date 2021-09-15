import React from 'react';
import ProductListCard from './ProductListCard';

const RelatedCarousel = ( {prodsInfo, prodsStyles, prodsMeta} ) => (
  <div className="carousel-card-container">
    {prodsInfo.map((prod, index) => (
      <ProductListCard
        key={prod.id}
        prodInfo={prod}
        prodStyles={prodsStyles[index]}
        prodMeta={prodsMeta[index]}
      />
    ))}
  </div>
);

export default RelatedCarousel;
