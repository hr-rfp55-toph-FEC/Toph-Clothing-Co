import React from 'react';
import ProductListCard from './ProductListCard';

//Carousel component is a general component so should be able to manage data from Related Items and from UserOutfit
const Carousel = ( {isRelatedProducts, isUserOutfits, prodsInfo, prodsStyles, prodsMeta} ) => (
  <div className="carousel-card-container">
    {prodsInfo.map((prod, index) => (
      <ProductListCard
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
