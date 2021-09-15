// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

function ImageGallery(props) {
  const { productStyles } = props;

  return (
    <div id="image-gallery">
      <img id="image-main" src={productStyles.results[0].photos[0].url} alt="Main Product" />
    </div>
  );
}

ImageGallery.propTypes = {
  productStyles: PropTypes.instanceOf(Object).isRequired,
};

export default ImageGallery;
