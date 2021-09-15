import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function ReviewStars({ rating, id }) {
  useEffect(() => {
    const starPercentage = (rating / 5) * 100;
    document.getElementById(id).querySelector('.stars-inner').style.width = `${starPercentage}%`;
  }, [rating, id]);

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

ReviewStars.propTypes = {
  rating: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default ReviewStars;
