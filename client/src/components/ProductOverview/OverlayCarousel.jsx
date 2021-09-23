import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import OverlayThumbnail from './OverlayThumbnail';

function OverlayCarousel(props) {
  const {
    productStyleSelectedPhotos,
    mainPicUrl,
    selectMainPic,
    showNextPic,
    showPrevPic,
    currIndex,
    expanded,
  } = props;

  // Carousel can have a max of 7 thumbnails at any given time. Initialize with first 7 thumbnails.
  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(7);
  const [showUpArrow, setShowUpArrow] = useState(true);
  const [showDownArrow, setShowDownArrow] = useState(true);
  const [currCarouselView, setCurrCarouselView] = useState(productStyleSelectedPhotos.slice(0, 7));

  const updateThumbnailCarousel = () => {
    const currentDisplay = productStyleSelectedPhotos.slice(startIndex, lastIndex);

    if (productStyleSelectedPhotos.length <= 7) {
      setShowDownArrow(false);
      setShowUpArrow(false);
      setCurrCarouselView(currentDisplay);
    } else {
      if (lastIndex !== productStyleSelectedPhotos.length) {
        setShowDownArrow(true);
      } else {
        setShowDownArrow(false);
      }
      setCurrCarouselView(currentDisplay);

      if (startIndex !== 0) {
        setShowUpArrow(true);
      } else {
        setShowUpArrow(false);
      }
    }
  };

  const handleScrollUp = () => {
    if (startIndex !== 0) {
      setStartIndex((prevState) => prevState - 1);
      setLastIndex((prevState) => prevState - 1);
      updateThumbnailCarousel();
    }
  };

  const handleScrollDown = () => {
    // if (lastIndex < productStyleSelectedPhotos.length - 1) {
    if (lastIndex < productStyleSelectedPhotos.length) {
      setStartIndex((prevState) => prevState + 1);
      setLastIndex((prevState) => prevState + 1);
      updateThumbnailCarousel();
    }
  };

  const scrollWithPic = (index) => {
    if (index === startIndex) {
      handleScrollUp();
    } else if (index === lastIndex - 1) {
      handleScrollDown();
    }
  };

  const showNextPicAndScroll = () => {
    showNextPic();
    scrollWithPic(currIndex);
  };

  const showPrevPicAndScroll = () => {
    showPrevPic();
    scrollWithPic(currIndex);
  };

  useEffect(() => {
    setStartIndex(0);
    setLastIndex(7);
    updateThumbnailCarousel();
  }, [productStyleSelectedPhotos]);

  useEffect(() => {
    updateThumbnailCarousel();
  }, [startIndex]);

  var upDownArrowClass = expanded ? 'up-down-arrow-expanded' : 'up-down-arrow-default';

  return (
    <>
      {/* !expanded &&  */}
      {!expanded
        && (currIndex < productStyleSelectedPhotos.length - 1)
        && (
          <div id="next-overlay-thumbnail-pic">
            <i className="fas fa-chevron-right" onClick={showNextPicAndScroll} role="presentation" />
          </div>
        )}
      {/* {!expanded  && */}
      {!expanded
        && (currIndex > 0)
        && (
          <div id="prev-overlay-thumbnail-pic">
            <i className="fas fa-chevron-left" onClick={showPrevPicAndScroll} role="presentation" />
          </div>
        )}
      <>

        <div
          id={expanded ? 'overlay-thumbnail-gallery-expanded' : 'overlay-thumbnail-gallery'}
          className="stylish-right-component"
        >

          {showUpArrow && (
            <div id="carousel-up-one" className={upDownArrowClass}>
              <i className="fas fa-angle-up" onClick={handleScrollUp} role="presentation" />
            </div>
          )}

          {currCarouselView.map((photo) => (
            <OverlayThumbnail
              overlayThumbnail={photo}
              selectMainPic={selectMainPic}
              mainPicUrl={mainPicUrl}
              startIndex={startIndex}
              expanded={expanded}
            />
          ))}

          {showDownArrow && (
            <div id="carousel-down-one" className={upDownArrowClass}>
              <i className="fas fa-angle-down" onClick={handleScrollDown} role="presentation" />
            </div>
          )}

        </div>

      </>
    </>
  );
}

OverlayCarousel.propTypes = {
  productStyleSelectedPhotos: PropTypes.instanceOf(Array).isRequired,
  mainPicUrl: PropTypes.string.isRequired,
  selectMainPic: PropTypes.func.isRequired,
  showNextPic: PropTypes.func.isRequired,
  showPrevPic: PropTypes.func.isRequired,
  currIndex: PropTypes.number.isRequired,
  expanded: PropTypes.bool.isRequired,
};

export default OverlayCarousel;
