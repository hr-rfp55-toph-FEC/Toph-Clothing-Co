import React from 'react';
import ProductListCard from './ProductListCard';

//Carousel component is a general component so should be able to manage data from Related Items and from UserOutfit
const Carousel = (props) => {
  const placeholder = props;
  return (
    <div className="carousel-card-container">
      <ProductListCard />
      <ProductListCard />
      <ProductListCard />
      <ProductListCard />
    </div>
  );
};

export default Carousel;
