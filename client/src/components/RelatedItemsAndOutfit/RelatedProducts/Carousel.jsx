import React, { useState, useEffect } from 'react';
import ProductListCard from './ProductListCard';

const Carousel = ({ prodsInfo, prodsStyles, prodsMeta }) => {
  const [currIndex, setCurrIndex] = useState(0);
  const [length, setLength] = useState(prodsInfo.length);
  console.log(currIndex);
  useEffect(() => {
    setLength(prodsInfo.length);
  }, [prodsInfo]);

  const showPrev = () => {
    if (currIndex === 0) {
      return;
    }
    if (currIndex > 0) {
      setCurrIndex((prevState) => prevState - 1);
    }
  };

  const showNext = () => {
    if (currIndex === length - 2) {
      return;
    }
    setCurrIndex((prevState) => prevState + 1);
  };

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {
          currIndex > 0
          && (
          <button onClick={showPrev} type="button" className="left-arrow arrow-hover">
            &lt;
          </button>
          )
        }
        <div className="carousel-content-wrapper">
          <div
            className="carousel-content show-4"
            style={{ transform: `translateX(-${currIndex * 50}%)` }}
          >
            {prodsInfo.map((prodInfo, index) => (
              <ProductListCard
                key={prodInfo.id}
                prodInfo={prodInfo}
                prodStyles={prodsStyles[index]}
                prodMeta={prodsMeta[index]}
              />
            ))}
          </div>
        </div>
        {
          currIndex < (length - 2)
          && (
            <button onClick={showNext} type="button" className="right-arrow arrow-hover">
              &gt;
            </button>
          )
        }
      </div>
    </div>
  );
};

export default Carousel;
