import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Thumbnail = ({ photo }) => {
  const [showModal, setShowModal] = useState(false);
  const thumbnail = (<img className="thumbnail" src={photo.url} alt="review-attachment" width="100px" role="presentation" onClick={() => setShowModal(true)} />);

  const modal = (
    <div id="review-modal" className="modal-container">
      <span className="closeimg" onClick={() => setShowModal(false)} role="presentation">x</span>
      <img className="modal-content" src={photo.url} alt="fullsize" />
      <div id="modal-caption">User photo</div>
    </div>
  );

  if (showModal) {
    return modal;
  }

  return thumbnail;
};

Thumbnail.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.number,
    url: PropTypes.string,
  }).isRequired,
};

export default Thumbnail;
