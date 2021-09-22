import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const Carousel = ({ children }) => {
  const [currIndex, setCurrIndex] = useState(0);
  // const [length, setLength] = useState(children.length);
  const [mappedChildrenLength, setMappedChildrenLength] = useState(children[1].length);

  // useEffect(() => {
  //   console.log(children);
  //   // console.log(children.length, 'children length');
  //   if (children.length !== length) {
  //     setLength(children.length);
  //     setCurrIndex(0);
  //   }
  //   // if (children[1].length !== mappedChildrenLength) {
  //   //   setLength(children[1].length + 1);
  //   //   setCurrIndex(0);
  //   // }
  //   // console.log(mappedChildrenLength,'mapped');
  // }, [children, length, mappedChildrenLength]);

  useEffect(() => {
    if (mappedChildrenLength !== children[1].length) {
      setMappedChildrenLength(children[1].length);
      setCurrIndex(0);
    }
    // console.log(mappedChildrenLength,'mapped');
  }, [children, mappedChildrenLength]);

  const showPrev = () => {
    if (currIndex === 0) {
      return;
    }
    if (currIndex > 0) {
      setCurrIndex((prevState) => prevState - 1);
    }
  };

  const showNext = () => {
    if (currIndex === mappedChildrenLength - 3) {
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
            <i className="fas fa-chevron-left arrow-icon" />
          </button>
          )
        }
        <div className="carousel-content-wrapper">
          <div
            className="carousel-content"
            style={{ transform: `translateX(-${currIndex * 25}rem)` }}
          >
            { children }
          </div>
        </div>
        {
          currIndex < (mappedChildrenLength - 3)
          && (
            <button onClick={showNext} type="button" className="right-arrow arrow-hover">
              <i className="fas fa-chevron-right arrow-icon" />
            </button>
          )
        }
      </div>
    </div>
  );
};

Carousel.propTypes = {
  children: PropTypes.instanceOf(Array).isRequired,
};
export default Carousel;
