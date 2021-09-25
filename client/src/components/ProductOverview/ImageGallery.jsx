import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import OverlayCarousel from './OverlayCarousel';

function ImageGallery(props) {
  const { productStyleSelected, expanded, handleExpand } = props;

  // For tracking the main image
  const [mainPicUrl, setMainPicUrl] = useState(productStyleSelected.photos[0].url);
  const [currIndex, setCurrIndex] = useState(0);

  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(7);
  const [currCarouselView, setCurrCarouselView] = useState(productStyleSelected.photos.slice(0, 7));

  const [showUpArrow, setShowUpArrow] = useState(true);
  const [showDownArrow, setShowDownArrow] = useState(true);

  const [imageExpandedCursorClass, setImageExpandedCursorClass] = useState('right-arrow-toggle-next-enabled');

  // Save a reference to last cursor position so we can transition smoothly between images
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

  // Determine mouse cursor appearance based on position
  const calcAndSetImageExpandedCursorClass = () => {
    const imageExpandedCursorClassRef = refCursorXPercentPosition.current < 0.5 ? 'left-arrow-toggle-prev' : 'right-arrow-toggle-next';
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

  // Show the correct thumbnails and up/down arrows to display for carousel
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

  const showNextPic = () => {
    if (currIndex < productStyleSelected.photos.length - 1) {
      setCurrIndex((prevState) => prevState + 1);
    }
  };

  const showPrevPic = () => {
    if (currIndex > 0) {
      setCurrIndex((prevState) => prevState - 1);
    }
  };

  // Updates thumbnail carousel view if index goes out of bounds
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
    if (currCursorXPercentPosition < 0.5) {
      showPrevPicAndScroll();
    } else {
      showNextPicAndScroll();
    }
  };

  /* This function repositions the background image and determines cursor appearance based
   on cursor position in the expanded view */
  const repositionBackground = (image, container, repositionType, e) => {
    const imageExpanded = image;
    const imageContainerExpanded = container;

    // Coordinates and size of image's container (The portion of the image we can see on screen).
    const imgContainerCoordinatesAndSize = imageContainerExpanded.getBoundingClientRect();
    const imgContainerWidth = imgContainerCoordinatesAndSize.width;
    const imgContainerHeight = imgContainerCoordinatesAndSize.height;
    const imgContainerAspRatio = imgContainerWidth / imgContainerHeight;

    /* Dimensions of the background image itself (see comments below)
    - There's no way to reliably grab the size of a background image after it's rendered, as
      background images aren't HTML elements. We have to back into its size using its container
      size, its zoom %, and its aspect ratio.
    - In order to determine which side of the image gets used to fill a container when applying
      "object-fit: contain", the browser compares the aspect ratio of the image and its container.
    - The aspect ratio of the original image vs. the container it's filling up is the key here,
      NOT whether the original image is wider than it is tall. The following would not work:
        const layout = imgOriginalHeight > imgOriginalWidth ? 'tall' : 'wide'
    - Grabbing original dimensions of a photo at a url is asynchronous and would break our
    code normally unless we wait for the photo to be loaded before continuing. It works here
    because our browser has already stored all these photos in cache and acts as synchronous. */
    const imgOriginal = new Image();
    imgOriginal.src = mainPicUrl;
    const imgOriginalWidth = imgOriginal.width;
    const imgOriginalHeight = imgOriginal.height;
    const imgOriginalAspRatio = imgOriginalWidth / imgOriginalHeight;
    const layout = ((imgOriginalAspRatio) < (imgContainerAspRatio)) ? 'tall' : 'wide';

    // Declare background image dimension and position variables
    let imgWidth;
    let imgHeight;
    let backgroundXPosition;
    let backgroundYPosition;

    let cursorXPercentPosition;
    let cursorYPercentPosition;

    if (repositionType === 'set') {
      /* Mouse coordinates with respect to image (see comments below)
      - Need to constrain coordinates to within (0, imgContainerWidth/Height),
      since for some reason offsets were ranging from -1 to slightly over the width/height
      due to rounding */
      const cursorXCoordinate = Math.min(Math.max(e.offsetX, 0), imgContainerWidth);
      const cursorYCoordinate = Math.min(Math.max(e.offsetY, 0), imgContainerHeight);

      // Turn current mouse coordinates into a % of container width/height
      cursorXPercentPosition = cursorXCoordinate / imgContainerWidth;
      cursorYPercentPosition = cursorYCoordinate / imgContainerHeight;

      refCursorXPercentPosition.current = cursorXPercentPosition;
      refCursorYPercentPosition.current = cursorYPercentPosition;
    } else if (repositionType === 'get') {
      cursorXPercentPosition = refCursorXPercentPosition.current;
      cursorYPercentPosition = refCursorYPercentPosition.current;
    } else {
      return;
    }

    /* Positioning logic
    - Note: This relies on the original image's aspect ratio being maintained. We guarantee
    this by using "object-fit: contain" in our CSS. Also assumes background image is sized
    to 100% of container.
    - The idea is that for every 1% the cursor moves with respect to the container, the
    background should also move by 1% (minus the height/width of the original container
    so that it doesn't overscroll).
    - If layout is 'tall', image will expand its width to fill the container. In this case,
    we don't want to scroll the container horizontally; only vertically.
    - If layout is 'wide', it's the opposite. Image will expand its height and we will only
    want to scroll it horizontally.
    - Some erroneous logic here because we only need to scroll in one axis if sizing to 100%,
    but keeping in case we want to re-scale to > 100% and need to scroll in two axes. */
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
  };

  useEffect(() => {
    updateThumbnailCarousel();
  }, [startIndex, lastIndex]);

  // Every time a new style is selected, revert to initial state
  useEffect(() => {
    setMainPicUrl(productStyleSelected.photos[0].url);
    setCurrIndex(0);
    setStartIndex(0);
    setLastIndex(7);
    updateThumbnailCarousel();
  }, [productStyleSelected]);

  // Every time index changes, update main image to the image at that index and update cursor
  useEffect(() => {
    setMainPicUrl(productStyleSelected.photos[currIndex].url);
    calcAndSetImageExpandedCursorClass();
  }, [productStyleSelected, currIndex]);

  /* This hook scrolls the background image and determines cursor appearance based on
    cursor position in the expanded view, using an "mousemove" event listener. Also
    saves a reference to the previous cursor position so that when toggling to new images,
    they can be immediately positioned correctly without waiting for mouse movement */
  useEffect(() => {
    const imageExpanded = document.getElementById('image-main-expanded');
    const imageContainerExpanded = document.getElementById('image-gallery-expanded');

    const handleZoomedScroll = (e) => {
      repositionBackground(imageExpanded, imageContainerExpanded, 'set', e);
      calcAndSetImageExpandedCursorClass();
    };

    if (expanded) {
      imageExpanded.addEventListener('mousemove', handleZoomedScroll);
      return function cleanup() {
        imageExpanded.removeEventListener('mousemove', handleZoomedScroll);
      };
    }

    return null;
  }, [expanded, mainPicUrl]);

  /* Hook to position new images correctly on render when toggling between images in expanded view
  Uses a reference to the previous cursor position to determine where to position the new images */
  useEffect(() => {
    if (expanded) {
      const imageExpanded = document.getElementById('image-main-expanded');
      const imageContainerExpanded = document.getElementById('image-gallery-expanded');

      if (imageExpanded !== null) {
        repositionBackground(imageExpanded, imageContainerExpanded, 'get');
      }
    }
  }, [mainPicUrl]);

  const imageGalleryId = expanded ? 'image-gallery-expanded' : 'image-gallery';

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
