import React from 'react';

const Thumbnail = ({ photo }) => {
  return (
    <a href={photo.url}>
      <img className="thumbnail" src={photo.url} alt="review-attachments" width="100px" />
    </a>
  );
};

export default Thumbnail;
