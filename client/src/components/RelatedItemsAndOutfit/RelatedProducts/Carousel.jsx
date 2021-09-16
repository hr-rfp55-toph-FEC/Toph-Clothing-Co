import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Carousel = ({ prodsInfo, children }) => {
  const [currIndex, setCurrIndex] = useState(0);
  const [length, setLength] = useState(prodsInfo.length);
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
    if (currIndex === length - 3) {
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
            className="carousel-content"
            style={{ transform: `translateX(-${currIndex * 25}%)` }}
          >
            { children }
          </div>
        </div>
        {
          currIndex < (length - 3)
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

Carousel.propTypes = {
  prodsInfo: PropTypes.instanceOf(Object).isRequired,
  children: PropTypes.instanceOf(Array).isRequired,
};
export default Carousel;
