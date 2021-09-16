// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';
import StyleThumbnail from './StyleThumbnail';

function StyleSelector(props) {
  const {
    productStyles,
    productStyleSelected,
  } = props;

  console.log('productStyles', productStyles);
  console.log('productStyleSelected', productStyleSelected);

  return (
    <div id="style-selector" className="product-right-component">
      <div id="style-selector-header">
        <b>STYLE</b>
        <b>{' > '}</b>
        {productStyleSelected.name.toUpperCase()}
      </div>
      <div id="style-selector-body">
        {productStyles.results.map((style) => (
          <StyleThumbnail
            style={style}
            key={style.style_id}
          />
        ))}
      </div>
    </div>
  );
}

StyleSelector.propTypes = {
  productStyles: PropTypes.instanceOf(Object).isRequired,
  productStyleSelected: PropTypes.instanceOf(Object).isRequired,
};

export default StyleSelector;
