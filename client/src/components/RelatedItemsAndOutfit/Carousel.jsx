import React from 'react';
import ProductListCard from './ProductListCard';

//Carousel component is a general component so should be able to manage data from Related Items and from UserOutfit
const Carousel = ( {ProdsInfo, ProdStyles} ) => {
  const placeholder = 1;
  return (
    <div className="carousel-card-container">
      {ProdsInfo.map((prod) => (
        <ProductListCard key={prod.id} productInfo={prod} />
      ))}
    </div>
  );
};

export default Carousel;
