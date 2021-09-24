import React from 'react';
import PropTypes from 'prop-types';

function OverlayThumbnail(props) {
  const {
    overlayThumbnail,
    selectMainPic,
    mainPicUrl,
    expanded,
  } = props;

  function handleOverlayThumbnailClick(thumbnail) {
    selectMainPic(thumbnail);
  }

  const isOverlayThumbnailSelected = mainPicUrl === overlayThumbnail.url;

  let overlayThumbnailClass = 'overlay-thumbnail-image';
  overlayThumbnailClass += isOverlayThumbnailSelected ? '-select' : '';
  overlayThumbnailClass += expanded ? '-expanded' : '';

  const thumbnailOrDot = expanded
    ? (
      <i
        // className={`fas fa-circle ${overlayThumbnailClass}`}
        // className="fas fa-circle"
        className={overlayThumbnailClass}
        onClick={() => (handleOverlayThumbnailClick(overlayThumbnail))}
        role="presentation"
      />
    )
    : (
      <img
        onClick={() => (handleOverlayThumbnailClick(overlayThumbnail))}
        role="presentation"
        className={overlayThumbnailClass}
        src={overlayThumbnail.url}
        alt="Style Thumbnail"
      />
    );

  return (
    <>
      {thumbnailOrDot}
    </>
  );
}

export default OverlayThumbnail;

OverlayThumbnail.propTypes = {
  overlayThumbnail: PropTypes.instanceOf(Object).isRequired,
  selectMainPic: PropTypes.func.isRequired,
  mainPicUrl: PropTypes.string.isRequired,
  expanded: PropTypes.bool.isRequired,
};
