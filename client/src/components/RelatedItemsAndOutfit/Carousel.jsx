import React from 'react';
import ProductListCard from './ProductListCard';

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
