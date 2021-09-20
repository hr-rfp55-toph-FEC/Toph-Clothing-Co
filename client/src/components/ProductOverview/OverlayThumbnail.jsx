import React from 'react';
import PropTypes from 'prop-types';

function OverlayThumbnail(props) {
  const { overlayThumbnail, selectMainPic, mainPicUrl } = props;

  function handleOverlayThumbnailClick(thumbnail) {
    selectMainPic(thumbnail);
  }

  const isOverlayThumbnailSelected = mainPicUrl === overlayThumbnail.url;

  let overlayThumbnailClass = 'overlay-thumbnail-image';
  overlayThumbnailClass += isOverlayThumbnailSelected ? '-select' : '';

  return (
    <img onClick={() => (handleOverlayThumbnailClick(overlayThumbnail))} role="presentation" className={overlayThumbnailClass} src={overlayThumbnail.url} alt="Style Thumbnail" />
  );
}

export default OverlayThumbnail;

OverlayThumbnail.propTypes = {
  overlayThumbnail: PropTypes.instanceOf(Object).isRequired,
  selectMainPic: PropTypes.func.isRequired,
  mainPicUrl: PropTypes.string.isRequired,
};
