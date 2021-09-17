import React from 'react';
import PropTypes from 'prop-types';

function StyleThumbnail(props) {
  const {
    style,
    productStyleSelected,
    selectProductStyle,
  } = props;

  const isStyleSelected = productStyleSelected.style_id === style.style_id;

  // console.log('style', style);

  function handleSelectThumbnail() {
    // console.log('click');
    selectProductStyle(style);
  }

  let styleThumbnailContainerClass = 'product-style-thumbnail-container';
  styleThumbnailContainerClass += isStyleSelected ? '-checked' : '';
  let styleThumbnailClass = 'product-style-thumbnail';
  styleThumbnailClass += isStyleSelected ? '-checked' : '';

  // Default product style thumbnail to 1st photo within that style
  return (
    <div onClick={handleSelectThumbnail} onKeyPress={handleSelectThumbnail} role="menuitem" tabIndex="0" className={styleThumbnailContainerClass}>
      {isStyleSelected && <div className="checky-check">✓</div>}
      <img className={styleThumbnailClass} src={style.photos[0].thumbnail_url} alt="Style Thumbnail" />
    </div>
  );
}

StyleThumbnail.propTypes = {
  style: PropTypes.instanceOf(Object).isRequired,
  productStyleSelected: PropTypes.instanceOf(Object).isRequired,
  selectProductStyle: PropTypes.func.isRequired,
};

export default StyleThumbnail;
