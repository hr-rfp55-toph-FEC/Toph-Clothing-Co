import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Thumbnail = ({ photo }) => {
  const [showModal, setShowModal] = useState(false);

  let modal;
  if (showModal) {
    modal = (
      <div id="review-modal" className="modal-background">
        <span className="close-modal" onClick={() => setShowModal(false)} role="presentation"><i className="fas fa-times" /></span>
        <img className="modal-content" src={photo.url} alt="fullsize" />
        <div id="modal-caption">User photo</div>
      </div>
    );
  }

  return (
    <span>
      <img className="thumbnail" src={photo.url} alt="review-attachment" width="100px" role="presentation" onClick={() => setShowModal(true)} />
      {modal}
    </span>
  );
};

Thumbnail.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.number,
    url: PropTypes.string,
  }).isRequired,
};

export default Thumbnail;
