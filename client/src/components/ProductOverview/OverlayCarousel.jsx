// import React, { useState, useEffect } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import OverlayThumbnail from './OverlayThumbnail';

function OverlayCarousel(props) {
  const {
    productStyleSelected,
    mainPicUrl,
    selectMainPic,
    currIndex,
    currCarouselView,
    expanded,
    showUpArrow,
    showDownArrow,
    handleScrollUp,
    handleScrollDown,
    showNextPicAndScroll,
    showPrevPicAndScroll,
  } = props;

  const upDownArrowClass = expanded ? 'up-down-arrow-expanded' : 'up-down-arrow-default';

  return (
    <>
      {/* !expanded &&  */}
      {!expanded
        && (currIndex < productStyleSelected.photos.length - 1)
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
              // startIndex={startIndex}
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
  productStyleSelected: PropTypes.instanceOf(Object).isRequired,
  mainPicUrl: PropTypes.string.isRequired,
  selectMainPic: PropTypes.func.isRequired,
  currIndex: PropTypes.number.isRequired,
  currCarouselView: PropTypes.instanceOf(Array).isRequired,
  expanded: PropTypes.bool.isRequired,
  showUpArrow: PropTypes.bool.isRequired,
  showDownArrow: PropTypes.bool.isRequired,
  handleScrollUp: PropTypes.func.isRequired,
  handleScrollDown: PropTypes.func.isRequired,
  showNextPicAndScroll: PropTypes.func.isRequired,
  showPrevPicAndScroll: PropTypes.func.isRequired,
};

export default OverlayCarousel;
