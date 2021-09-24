// import React, { useState } from 'react';
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
// import OverlayThumbnail from './OverlayThumbnail';
import OverlayCarousel from './OverlayCarousel';

function ImageGallery(props) {
  const { productStyleSelected, expanded, handleExpand } = props;

  // For tracking the main image
  const [mainPicUrl, setMainPicUrl] = useState(productStyleSelected.photos[0].url);
  const [currIndex, setCurrIndex] = useState(0);

  // Thumbnail carousel can have a max of 7 thumbnails. Initialize with (up to) first 7 thumbnails.
  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(7);
  const [currCarouselView, setCurrCarouselView] = useState(productStyleSelected.photos.slice(0, 7));

  // On render we'll immediately calculate whether or not the carousel up/down arrows should show
  const [showUpArrow, setShowUpArrow] = useState(true);
  const [showDownArrow, setShowDownArrow] = useState(true);

  const [imageExpandedCursorClass, setImageExpandedCursorClass] = useState('right-arrow-toggle-next-enabled');

  // Save a reference to last cursor position so we can transition smoothly between images.
  const refCursorXPercentPosition = useRef();
  const refCursorYPercentPosition = useRef();

  // On thumbnail click, set main image to thumbnail's image and current index to thumbnail's index
  const selectMainPic = (overlayThumbnail) => {
    setMainPicUrl(overlayThumbnail.url);
    for (let j = 0; j < productStyleSelected.photos.length; j += 1) {
      if (productStyleSelected.photos[j].url === overlayThumbnail.url) {
        setCurrIndex(j);
        break;
      }
    }
  };

  // Determine mouse cursor state (right arrow vs left arrow, enabled vs disabled)
  const calcAndSetImageExpandedCursorClass = () => {
    const imageExpandedCursorClassRef = refCursorXPercentPosition.current < 0.5 ? 'left-arrow-toggle-prev' : 'right-arrow-toggle-next';
    // console.log(refCursorXPercentPosition.current);

    let imageExpandedCursorClassStyled;

    if (imageExpandedCursorClassRef === 'right-arrow-toggle-next') {
      if (currIndex < productStyleSelected.photos.length - 1) {
        imageExpandedCursorClassStyled = 'right-arrow-toggle-next-enabled';
      } else {
        imageExpandedCursorClassStyled = 'right-arrow-toggle-next-disabled';
      }
    }
    if (imageExpandedCursorClassRef === 'left-arrow-toggle-prev') {
      if (currIndex > 0) {
        imageExpandedCursorClassStyled = 'left-arrow-toggle-prev-enabled';
      } else {
        imageExpandedCursorClassStyled = 'left-arrow-toggle-prev-disabled';
      }
    }
    setImageExpandedCursorClass(imageExpandedCursorClassStyled);
  };

  // Updates thumbnail carousel with the correct thumbnails and up/down arrows to display.
  const updateThumbnailCarousel = () => {
    const currentDisplay = productStyleSelected.photos.slice(startIndex, lastIndex);

    if (productStyleSelected.photos.length <= 7) {
      setShowDownArrow(false);
      setShowUpArrow(false);
    } else {
      if (lastIndex !== productStyleSelected.photos.length) {
        setShowDownArrow(true);
      } else {
        setShowDownArrow(false);
      }

      if (startIndex !== 0) {
        setShowUpArrow(true);
      } else {
        setShowUpArrow(false);
      }
    }
    setCurrCarouselView(currentDisplay);
  };

  // Helper functions to automatically scroll thumbnails up/down depending on the index
  const handleScrollUp = () => {
    if (startIndex !== 0) {
      setStartIndex((prevState) => prevState - 1);
      setLastIndex((prevState) => prevState - 1);
      updateThumbnailCarousel();
    }
  };

  const handleScrollDown = () => {
    if (lastIndex < productStyleSelected.photos.length) {
      setStartIndex((prevState) => prevState + 1);
      setLastIndex((prevState) => prevState + 1);
      updateThumbnailCarousel();
    }
  };

  // To show next picture, up the current index and our hook will handle the render
  const showNextPic = () => {
    if (currIndex < productStyleSelected.photos.length - 1) {
      setCurrIndex((prevState) => prevState + 1);
    }
  };

  // To show previous picture, lower the current index and our hook will handle the render
  const showPrevPic = () => {
    if (currIndex > 0) {
      setCurrIndex((prevState) => prevState - 1);
    }
  };

  // Update thumbnail carousel view if needed
  const scrollWithPic = (index) => {
    if (index === startIndex) {
      handleScrollUp();
    } else if (index === lastIndex - 1) {
      handleScrollDown();
    }
  };

  // When showing next/previous pictures, also update the thumbnail carousel if needed
  const showNextPicAndScroll = () => {
    showNextPic();
    scrollWithPic(currIndex);
  };

  const showPrevPicAndScroll = () => {
    showPrevPic();
    scrollWithPic(currIndex);
  };

  // Which picture to toggle to (next or previous) depends on cursor position
  const togglePic = () => {
    const currCursorXPercentPosition = refCursorXPercentPosition.current;
    // console.log(currCursorXPercentPosition);

    // If mouse hasn't moved after expanding view, the cursor's position will be undefined.
    // Treat this case as "right/next" since the cursor will be > 50% to the right after expanding.
    if (currCursorXPercentPosition < 0.5) {
      // showPrevPic();
      showPrevPicAndScroll();
    } else {
      // showNextPic();
      showNextPicAndScroll();
    }
  };

  // Anytime the start/last index changes, update carousel. (Technically already taken care of)
  useEffect(() => {
    updateThumbnailCarousel();
  }, [startIndex, lastIndex]);

  // Every time a new style is selected, reset main image, current index and thumbnail carousel
  useEffect(() => {
    setMainPicUrl(productStyleSelected.photos[0].url);
    setCurrIndex(0);
    setStartIndex(0);
    setLastIndex(7);
    updateThumbnailCarousel();
  }, [productStyleSelected]);

  // Every time the index changes, update main image to the image at that index
  useEffect(() => {
    setMainPicUrl(productStyleSelected.photos[currIndex].url);
    // We also want to change cursor whenever index changes, not just on movement.
    calcAndSetImageExpandedCursorClass();
  }, [productStyleSelected, currIndex]);

  // Hook to scroll background image based on cursor position in zoomed view.
  useEffect(() => {
    const imageExpanded = document.getElementById('image-main-expanded');
    const imageContainerExpanded = document.getElementById('image-gallery-expanded');

    // Image sizing and positioning must be contained within the event handler. Just inside the hook
    // is not good enough b/c we need to dynamically recalculate even when state doesn't change.
    const handleZoomedScroll = (e) => {
      // console.log(imageExpanded);
      // console.log(imageExpanded.style.backgroundPositionX);
      // console.log(imageExpanded.style.backgroundPositionY);

      // Coordinates and size of image's container (The portion of the image we can see on screen).
      // Note: Will be strictly less than or equal to the size of the image.
      const imgContainerCoordinatesAndSize = imageContainerExpanded.getBoundingClientRect();

      // Dimensions of image's container
      const imgContainerWidth = imgContainerCoordinatesAndSize.width;
      const imgContainerHeight = imgContainerCoordinatesAndSize.height;
      const imgContainerAspRatio = imgContainerWidth / imgContainerHeight;

      // Dimensions of image itself
      /* There's no way to reliably grab the size of a background image after it's rendered.
        We have to back into it based on its container size, its scale, and its aspect ratio */
      /* In order to determine which side of the image gets used to fill a container when applying
        "object-fit: contain", the browser compares the aspect ratio of the image and its container.
      The aspect ratio of the original image vs. the container it's filling up is the key here,
        NOT whether the original image is wider than it is tall. The following would not work:
          const layout = imgOriginalHeight > imgOriginalWidth ? 'tall' : 'wide'; */
      /* NOTE: Grabbing original dimensions of a photo at a url is asynchronous and would break our
      code normally unless we wait for the photo to be loaded before continuing. It works here
      because our browser has already stored all these photos in cache and acts as synchronous. */
      const imgOriginal = new Image();
      imgOriginal.src = mainPicUrl;
      const imgOriginalWidth = imgOriginal.width;
      const imgOriginalHeight = imgOriginal.height;
      const imgOriginalAspRatio = imgOriginalWidth / imgOriginalHeight;
      const layout = ((imgOriginalAspRatio) < (imgContainerAspRatio)) ? 'tall' : 'wide';
      // console.log('imgOriginalWidth', imgOriginalWidth);
      // console.log('imgOriginalHeight', imgOriginalHeight);
      // console.log('layout', layout);

      // Mouse coordinates with respect to image
      // Note: Image container also works here, since both are positioned at top 0/left 0
      /* Note: Need to constrain coordinates to within (0, imgContainerWidth/Height),
      since for some reason offsets were ranging from -1 to slightly over the width/height. */
      const cursorXCoordinate = Math.min(Math.max(e.offsetX, 0), imgContainerWidth);
      const cursorYCoordinate = Math.min(Math.max(e.offsetY, 0), imgContainerHeight);

      // Turn current mouse coordinates into a % of container width/height
      const cursorXPercentPosition = cursorXCoordinate / imgContainerWidth;
      const cursorYPercentPosition = cursorYCoordinate / imgContainerHeight;

      // Declare background image dimension and position variables
      let imgWidth;
      let imgHeight;
      let backgroundXPosition;
      let backgroundYPosition;

      refCursorXPercentPosition.current = cursorXPercentPosition;
      refCursorYPercentPosition.current = cursorYPercentPosition;

      /* If layout is 'tall', image will expand its width to fill the container. In this case,
          we don't want to scroll the container horizontally; only vertically.
      If layout is 'wide', it's the opposite. Image will expand its height and we will only
          want to scroll it horizontally.
        NOTE: This relies on the original image's aspect ratio being maintained. We guarantee
          this by using "object-fit: contain" */
      /* The idea is that for every 1% the cursor moves with respect to the container, the
        background should also move by 1%. The hard part is trying to quantify that "1%" in units.
        NOTE: Technically the background doesn't move by 100% of width/height; it moves by 100%
        minus the height/width of container, hence the subtraction of container height/width */
      if (layout === 'tall') {
        imgWidth = imgContainerWidth;
        imgHeight = (imgContainerWidth * imgOriginalHeight) / imgOriginalWidth - imgContainerHeight;

        backgroundXPosition = cursorXPercentPosition * imgWidth;
        backgroundYPosition = cursorYPercentPosition * imgHeight;

        imageExpanded.style.backgroundPositionX = '0px';
        imageExpanded.style.backgroundPositionY = `${-backgroundYPosition}px`;
      } else if (layout === 'wide') {
        imgWidth = (imgContainerHeight * imgOriginalWidth) / imgOriginalHeight - imgContainerWidth;
        imgHeight = imgContainerHeight;

        backgroundXPosition = cursorXPercentPosition * imgWidth;
        backgroundYPosition = cursorYPercentPosition * imgHeight;

        imageExpanded.style.backgroundPositionX = `${-backgroundXPosition}px`;
        imageExpanded.style.backgroundPositionY = '0px';
      }

      // On each mouse movement, also determine the new cursor style.
      calcAndSetImageExpandedCursorClass();
    };

    if (expanded) {
      // console.log('Image:', mainPicUrl);
      // console.log('Expanded View:', imageExpanded);

      imageExpanded.addEventListener('mousemove', handleZoomedScroll);
      /* Need to remove event listener right before expanded image unmounts, or else event listener
        will remain on the DOM even after it's gone. The event listener would get tied to the
        default image and end up moving that around, which we don't want. */
      return function cleanup() {
        imageExpanded.removeEventListener('mousemove', handleZoomedScroll);
      };
    }

    return null;
  }, [expanded, mainPicUrl]);

  // Hook to position new images correctly when toggling between images in zoomed view.
  useEffect(() => {
    // console.log('currIndex', currIndex);
    // console.log('mainPicUrl', mainPicUrl);

    if (expanded) {
      const imageExpanded = document.getElementById('image-main-expanded');
      const imageContainerExpanded = document.getElementById('image-gallery-expanded');

      if (imageExpanded !== null) {
        // console.log('backgroundPositionX', imageExpanded.style.backgroundPositionX);
        // console.log('backgroundPositionY', imageExpanded.style.backgroundPositionY);
        // console.log('savedCursorXCoordinate', savedCursorXCoordinate);
        // console.log('savedCursorYCoordinate', savedCursorYCoordinate);
        // console.log('refCursorXPercentPosition', refCursorXPercentPosition.current);
        // console.log('refCursorYPercentPosition', refCursorYPercentPosition.current);

        const imgContainerCoordinatesAndSize = imageContainerExpanded.getBoundingClientRect();

        // Dimensions of image's container
        const imgContainerWidth = imgContainerCoordinatesAndSize.width;
        const imgContainerHeight = imgContainerCoordinatesAndSize.height;
        const imgContainerAspRatio = imgContainerWidth / imgContainerHeight;

        const imgOriginal = new Image();
        imgOriginal.src = mainPicUrl;
        const imgOriginalWidth = imgOriginal.width;
        const imgOriginalHeight = imgOriginal.height;
        const imgOriginalAspRatio = imgOriginalWidth / imgOriginalHeight;
        const layout = ((imgOriginalAspRatio) < (imgContainerAspRatio)) ? 'tall' : 'wide';

        let imgWidth;
        let imgHeight;
        let backgroundXPosition;
        let backgroundYPosition;

        const currCursorXPercentPosition = refCursorXPercentPosition.current;
        const currCursorYPercentPosition = refCursorYPercentPosition.current;

        if (layout === 'tall') {
          imgWidth = imgContainerWidth;
          imgHeight = (imgContainerWidth * imgOriginalHeight)
            / imgOriginalWidth - imgContainerHeight;

          backgroundXPosition = currCursorXPercentPosition * imgWidth;
          backgroundYPosition = currCursorYPercentPosition * imgHeight;

          imageExpanded.style.backgroundPositionX = '0px';
          imageExpanded.style.backgroundPositionY = `${-backgroundYPosition}px`;
        } else if (layout === 'wide') {
          imgWidth = (imgContainerHeight * imgOriginalWidth)
            / imgOriginalHeight - imgContainerWidth;
          imgHeight = imgContainerHeight;

          backgroundXPosition = currCursorXPercentPosition * imgWidth;
          backgroundYPosition = currCursorYPercentPosition * imgHeight;

          imageExpanded.style.backgroundPositionX = `${-backgroundXPosition}px`;
          imageExpanded.style.backgroundPositionY = '0px';
        }
      }
    }
    // Can't use just currIndex here. Need to wait until after image re-renders after index change.
  }, [mainPicUrl]);

  const imageGalleryId = expanded ? 'image-gallery-expanded' : 'image-gallery';
  // const imageMainId = expanded ? 'image-main-expanded' : 'image-main';

  return (
    <div id={imageGalleryId}>
      {expanded
        ? (
          <div
            id="image-main-expanded"
            style={{
              backgroundImage: `url(${mainPicUrl})`,
            }}
            onClick={togglePic}
            role="presentation"
            className={imageExpandedCursorClass}
          />
        )
        : (
          <div
            id="image-main"
            style={{
              backgroundImage: `url(${mainPicUrl})`,
              backgroundPosition: 'center',
            }}
          />
        )}
      <div id="expand-main-image">
        <img
          className="default-toggle-pic-arrow"
          onClick={handleExpand}
          role="presentation"
          alt="Style Thumbnail"
          src="/assets/icons8-full-screen-100.png"
        />
      </div>
      <OverlayCarousel
        productStyleSelected={productStyleSelected}
        mainPicUrl={mainPicUrl}
        selectMainPic={selectMainPic}
        currIndex={currIndex}
        currCarouselView={currCarouselView}
        expanded={expanded}
        showUpArrow={showUpArrow}
        showDownArrow={showDownArrow}
        handleScrollUp={handleScrollUp}
        handleScrollDown={handleScrollDown}
        showNextPicAndScroll={showNextPicAndScroll}
        showPrevPicAndScroll={showPrevPicAndScroll}
        imageExpandedCursorClass={imageExpandedCursorClass}
      />
    </div>
  );
}

ImageGallery.propTypes = {
  productStyleSelected: PropTypes.instanceOf(Object).isRequired,
  expanded: PropTypes.bool.isRequired,
  handleExpand: PropTypes.func.isRequired,
};

export default ImageGallery;
