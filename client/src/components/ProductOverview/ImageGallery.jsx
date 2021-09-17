// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

function ImageGallery(props) {
  const { productStyleSelected } = props;

  return (
    <div id="image-gallery">
      <img id="image-main" src={productStyleSelected.photos[0].url} alt="Main Product" />
    </div>
  );
}

ImageGallery.propTypes = {
  productStyleSelected: PropTypes.instanceOf(Object).isRequired,
};

export default ImageGallery;
