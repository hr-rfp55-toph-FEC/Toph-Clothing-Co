import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Thumbnail = ({ photo }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <img className="thumbnail" src={photo.url} alt="review-attachments" width="100px" role="presentation" onClick={() => setShowModal(true)} />
  );
};

Thumbnail.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.number,
    url: PropTypes.string,
  }).isRequired,
};

export default Thumbnail;
