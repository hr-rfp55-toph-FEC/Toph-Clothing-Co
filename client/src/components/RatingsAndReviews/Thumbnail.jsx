import React from 'react';

const Thumbnail = ({ photo }) => {
  return (
    <a href={photo.url}>
      <img src={photo.url} alt="review-attachments" width="100px" />
    </a>
  );
};

export default Thumbnail;
