import React, { useState } from 'react';
import PropTypes from 'prop-types';

function StyleThumbnail(props) {
  const {
    style,
  } = props;

  const [checkState, setCheckState] = useState(false);

  console.log('style', style);

  function handlecheck() {
    // console.log('click');
    setCheckState(!checkState);
  }

  let styleThumbnailContainerClass = 'product-style-thumbnail-container';
  styleThumbnailContainerClass += checkState ? '-checked' : '';
  let styleThumbnailClass = 'product-style-thumbnail';
  styleThumbnailClass += checkState ? '-checked' : '';

  // Default product style thumbnail to 1st photo within that style
  return (
    <div onClick={handlecheck} onKeyPress={handlecheck} role="menuitem" tabIndex="0" className={styleThumbnailContainerClass}>
      {checkState && <div className="checky-check">✓</div>}
      <img className={styleThumbnailClass} src={style.photos[0].thumbnail_url} alt="Style Thumbnail" />
    </div>
  );
}

StyleThumbnail.propTypes = {
  style: PropTypes.instanceOf(Object).isRequired,
};

export default StyleThumbnail;
