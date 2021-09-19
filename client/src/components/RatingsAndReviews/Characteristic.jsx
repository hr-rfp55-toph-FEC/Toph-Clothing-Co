import React from 'react';
import PropTypes from 'prop-types';

const Characteristic = ({ characteristic }) => {
  const sliderStyle = {
    'margin-left': '40%',
  };

  return (
    <div className="char-bar-container">
      <div className="char-summary">
        {characteristic[0]}
      </div>
      <div className="slider-container">
        <ul className="slider-bar" role="presentation">
          <li className="slider-bar-segment" role="presentation"></li>
          <li className="slider-bar-segment" role="presentation"></li>
          <li className="slider-bar-segment" role="presentation"></li>
          <li className="slider-bar-segment" role="presentation"></li>
        </ul>
      </div>
    </div>
  )
};

Characteristic.propTypes = {
  characteristic: PropTypes.instanceOf(Array).isRequired,
};

export default Characteristic;
