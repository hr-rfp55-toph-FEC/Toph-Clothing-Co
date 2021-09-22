// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import OverlayThumbnail from './OverlayThumbnail';

function ImageGallery(props) {
  const { productStyleSelected, expanded, handleExpand } = props;
  const [mainPicUrl, setMainPicUrl] = useState(productStyleSelected.photos[0].url);
  const [currIndex, setCurrIndex] = useState(0);

  // On thumbnail click, set main image to thumbnail's image and current index to thumbnail's index
  const selectMainPic = (overlayThumbnail) => {
    setMainPicUrl(overlayThumbnail.url);
    for (let j = 0; j < productStyleSelected.photos.length; j += 1) {
      // console.log(productStyleSelected.photos[j]);
      if (productStyleSelected.photos[j].url === overlayThumbnail.url) {
        setCurrIndex(j);
        break;
      }
    }
  };

  // To show next picture, up the current index and our hook will handle the render
  const showNextPic = () => {
    // console.log('index before showNextPic', currIndex, length);
    if (currIndex < productStyleSelected.photos.length - 1) {
      setCurrIndex((prevState) => prevState + 1);
      // console.log('index after showNextPic', currIndex);
    }
  };

  // To show previous picture, lower the current index and our hook will handle the render
  const showPrevPic = () => {
    // console.log('index before showPrevPic', currIndex, length);
    if (currIndex > 0) {
      setCurrIndex((prevState) => prevState - 1);
      // console.log('index after showPrevPic', currIndex);
    }
  };

  // Every time a new style is selected, reset main image and current index
  useEffect(() => {
    setMainPicUrl(productStyleSelected.photos[0].url);
    setCurrIndex(0);
  }, [productStyleSelected]);

  // Every time the index changes, update main image to the image at that index
  useEffect(() => {
    setMainPicUrl(productStyleSelected.photos[currIndex].url);
  }, [productStyleSelected, currIndex]);

  const imageGalleryId = expanded ? 'image-gallery-expanded' : 'image-gallery';
  // const imageMainId = expanded ? 'image-main-expanded' : 'image-main';

  useEffect(() => {
    const imageExpanded = document.getElementById('image-main-expanded');
    const imageContainerExpanded = document.getElementById('image-gallery-expanded');

    const imageDefaulted = document.getElementById('image-main');

    // Image sizing and positioning must be contained within the event handler. Just inside the hook
    // is not good enough b/c we need to dynamically recalculate even when state doesn't change.
    const handleZoomedScroll = (e) => {
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
      const imgOriginal = new Image();
      imgOriginal.src = mainPicUrl;
      const imgOriginalWidth = imgOriginal.width;
      const imgOriginalHeight = imgOriginal.height;
      const imgOriginalAspRatio = imgOriginalWidth / imgOriginalHeight;
      const layout = ((imgOriginalAspRatio) < (imgContainerAspRatio)) ? 'tall' : 'wide';
      if (imgOriginalWidth === undefined || imgOriginalWidth === 0) {
        console.log(imgOriginalWidth);
      }
      if (imgOriginalHeight === undefined || imgOriginalHeight === 0) {
        console.log(imgOriginalHeight);
      }
      // console.log('imgOriginalWidth', imgOriginalWidth);
      // console.log('imgOriginalHeight', imgOriginalHeight);
      // console.log('layout', layout);

      // Mouse coordinates with respect to image
      // Note: Image container also works here, since both are positioned at top 0/left 0
      const cursorXCoordinate = e.offsetX;
      const cursorYCoordinate = e.offsetY;

      // Turn current mouse coordinates into a % of container width/height
      const cursorXPercentPosition = cursorXCoordinate / imgContainerWidth;
      const cursorYPercentPosition = cursorYCoordinate / imgContainerHeight;

      // Declare background image dimension and position variables
      let imgWidth;
      let imgHeight;
      let backgroundXPosition;
      let backgroundYPosition;

      /* If layout is 'tall', image will expand its width to fill the container. In this case,
          we don't want to scroll the container horizontally; only vertically.
      If layout is 'wide', it's the opposite. Image will expand its height and we will only
          want to scroll it horizontally.
        NOTE: This relies on the original image's aspect ratio being maintained. We guarantee
          this by using "object-fit: contain" */
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

    const handleDefaultedParallax = (e) => {
      const windowWidth = window.innerWidth / 5;
      const windowHeight = window.innerHeight / 5;
      const mouseX = e.clientX / windowWidth;
      const mouseY = e.clientY / windowHeight;
      imageDefaulted.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0)`;
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
    imageDefaulted.addEventListener('mousemove', handleDefaultedParallax);
    return function cleanup() {
      imageDefaulted.removeEventListener('mousemove', handleDefaultedParallax);
    };
  }, [expanded, mainPicUrl]);

  return (
    <div id={imageGalleryId}>
      {expanded
        ? (
          <div
            id="image-main-expanded"
            style={{
              backgroundImage: `url(${mainPicUrl})`,
            }}
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
      <div id="expand-main-image"><i className="fas fa-expand" onClick={handleExpand} role="presentation" /></div>
      {(currIndex < productStyleSelected.photos.length - 1)
        && <div id="next-overlay-thumbnail-pic"><i className="fas fa-chevron-right" onClick={showNextPic} role="presentation" /></div>}
      {(currIndex > 0)
        && <div id="prev-overlay-thumbnail-pic"><i className="fas fa-chevron-left" onClick={showPrevPic} role="presentation" /></div>}
      <div id="overlay-thumbnail-gallery" className="stylish-right-component">
        {productStyleSelected.photos.map((photo) => (
          <OverlayThumbnail
            overlayThumbnail={photo}
            selectMainPic={selectMainPic}
            mainPicUrl={mainPicUrl}
          />
        ))}
      </div>
    </div>
  );
}

ImageGallery.propTypes = {
  productStyleSelected: PropTypes.instanceOf(Object).isRequired,
  expanded: PropTypes.bool.isRequired,
  handleExpand: PropTypes.func.isRequired,
};

export default ImageGallery;
