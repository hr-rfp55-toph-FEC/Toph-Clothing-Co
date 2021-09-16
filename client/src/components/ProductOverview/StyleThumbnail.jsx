// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

function StyleThumbnail(props) {
  const {
    style,
  } = props;

  console.log('style', style);

  // Default product style thumbnail to 1st photo within that style
  return (
    <div className="product-style-thumbnail-container">
      <img className="product-style-thumbnail" src={style.photos[0].thumbnail_url} alt="Style Thumbnail" />
    </div>
  );
}

StyleThumbnail.propTypes = {
  style: PropTypes.instanceOf(Object).isRequired,
};

export default StyleThumbnail;
