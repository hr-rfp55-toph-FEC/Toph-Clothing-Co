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

  // console.log(mainPicUrl);

  // useEffect(()=>{
  //   if (expanded) {
  //     const expandedImage = document.getElementById('image-main-expanded');
  //     console.log(expandedImage);
  //     expandedImage.addEventListener('mousemove', (e) => {
  //       expandedImage.style.left = e.offsetX + 'px';
  //       expandedImage.style.top = e.offsetY + 'px';
  //     });
  //   }
  // }, [expanded]);

  useEffect(() => {
    const elExpanded = document.getElementById('image-main-expanded');
    // const elDefault = document.getElementById('image-main');

    const handleMove = (e) => {
      // console.log(elExpanded);
      // console.log('Expanded View Background Size:', elExpanded.style.backgroundSize);
      // console.log(e);
      // elExpanded.style.backgroundPositionX = `${-e.offsetX}px`;
      // elExpanded.style.backgroundPositionY = `${-e.offsetY}px`;
      // elExpanded.style.backgroundPositionX = `${-e.layerX}px`;
      // elExpanded.style.backgroundPositionY = `${-e.layerY}px`;

      // elExpanded.style.backgroundPositionX = `${e.offsetX * 0.1}%`;
      // elExpanded.style.backgroundPositionX = `center`;
      // elExpanded.style.backgroundPositionY = `${e.offsetY * 0.5}%`;

      console.log('e.offsetX', e.offsetX); // min is -1 on left side, max is 944 on right side
      console.log('e.offsetY', e.offsetY); // min is -1 on top size, max is 478 on bottom side
      // makes sense - when inspecting, the box for the image is 944.297 wide x 477.531 tall

      // console.log('getBoundingClientRect', elExpanded.getBoundingClientRect());
      // console.log('getClientRects', elExpanded.getClientRects());
      // 250% view
      // bottom: 1286.546875
      // height: 1193.828125
      // left: 202.34375 // SAME
      // right: 2553.078125
      // top: 92.71875 // SAME
      // width: 2350.734375
      // x: 202.34375 // SAME
      // y: 92.71875 // SAME

      // 100% view
      // bottom: 570.25 // Subtract y from bottom to
      // height: 477.53125
      // left: 202.34375
      // right: 1146.640625
      // top: 92.71875 // SAME
      // width: 944.296875
      // x: 202.34375 // SAME
      // y: 92.71875 // SAME

      elExpanded.style.backgroundPositionX = `${e.offsetX * 1}%`;
      elExpanded.style.backgroundPositionY = `${e.offsetY * 0.3}%`;

      // const windowWidth = window.innerWidth / 5;
      // const windowHeight = window.innerHeight / 5;
      // const mouseX = e.clientX / windowWidth;
      // const mouseY = e.clientY / windowHeight;
      // elExpanded.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0)`;
    };

    if (expanded) {
      console.log('Image:', mainPicUrl);
      console.log('Expanded View:', elExpanded);
      // console.log('Expanded View Height:', elExpanded.style.height);
      // console.log('Expanded View Width:', elExpanded.style.width);
      // console.log('Expanded View Height:', elExpanded.offsetHeight);
      // console.log('Expanded View Width:', elExpanded.offsetWidth);
      console.log('getBoundingClientRect', elExpanded.getBoundingClientRect());
      console.log('getClientRects', elExpanded.getClientRects());
      // Getting the background size before mount doesn't work...
      // console.log('Expanded View Background Size:', elExpanded.style.backgroundSize);
      // // Setting the background size works, b/c it doesn't require the element to be mounted yet
      // console.log('Expanded View Background Size:', elExpanded.style.backgroundSize = "60px 120px");
      elExpanded.addEventListener('mousemove', handleMove);
      // Need to remove event listener right before expanded image unmounts, or else event listener will remain even after it's gone
      // The event listener would get tied to the default image and end up moving that around, which we don't want.
      return function cleanup() {
        elExpanded.removeEventListener('mousemove', handleMove);
      };
    }

    if (!expanded) {
      // console.log('Default View:', elDefault);
      // el.removeEventListener("mousemove", handleMove);
    }
    return null;
    // console.log(expanded);
  }, [expanded]);

  // const handleHover = (event) => {
  //   const elExpanded = document.getElementById('image-main-expanded');
  //   console.log('Expanded View Background Size:', elExpanded.style.backgroundSize);
  //   console.log('Expanded View Background Size:', elExpanded.style);

  //   console.log('Expanded View Background Size Event:', event.target.style);
  // };

  return (
    <div id={imageGalleryId}>
      {/* {expanded
        ? (
          <img
            id="image-main-expanded"
            src={mainPicUrl}
          // onClick={handleHover}
          // role="presentation"
          />
        )
        : (
          <img
            id="image-main"
            src={mainPicUrl}
          />
        )} */}
      {expanded
        ? (
          <div
            id="image-main-expanded"
            style={{
              backgroundImage: `url(${mainPicUrl})`,
            }}
          // onClick={handleHover}
          // role="presentation"
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
      {/* <div id={imageMainId} style={`background-image: url(${mainPicUrl.substring(0, mainPicUrl.length - 1)})`}></div> */}
      {/* <img id={imageMainId} src={mainPicUrl} alt="Main Product" /> */}
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
