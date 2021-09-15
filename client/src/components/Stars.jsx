import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function Stars({ rating, id }) {
  useEffect(() => {
    const starPercentage = (rating / 5) * 100;
    document.getElementById(id).style.width = `${starPercentage}%`;
  }, [rating, id]);

  return (
    <div className="stars-outer">
      <i className="far fa-star" />
      <i className="far fa-star" />
      <i className="far fa-star" />
      <i className="far fa-star" />
      <i className="far fa-star" />
      <div className="stars-inner" id={id}>
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
        <i className="fas fa-star" />
      </div>
    </div>
  );
}

export default Stars;

Stars.propTypes = {
  rating: PropTypes.number.isRequired,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
};
