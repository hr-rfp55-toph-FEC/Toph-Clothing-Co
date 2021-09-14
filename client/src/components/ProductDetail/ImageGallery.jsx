// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

function ImageGallery(props) {
  const { productStyles } = props;

  if (JSON.stringify(productStyles) === '{}') {
    return null;
  }

  return (
    <div id="image-gallery">
      <img id="image-main" src={productStyles.photos[0].url} alt="Main Product" />
    </div>
  );
}

ImageGallery.propTypes = {
  productStyles: PropTypes.instanceOf(Object).isRequired,
  // productStyles: PropTypes.shape({
  //   photos: PropTypes.arrayOf,
  // }).isRequired,
};

export default ImageGallery;
