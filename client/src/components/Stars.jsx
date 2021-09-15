import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function Stars({ rating }) {
  useEffect(() => {
    const starPercentage = (rating / 5) * 100;
    document.querySelector('.stars-inner').style.width = `${starPercentage}%`;
  }, [rating]);

  return (
    <div className="stars-outer">
      <i className="far fa-star" />
      <i className="far fa-star" />
      <i className="far fa-star" />
      <i className="far fa-star" />
      <i className="far fa-star" />
      <div className="stars-inner">
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
};
