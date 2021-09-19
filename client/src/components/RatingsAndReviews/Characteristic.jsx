import React from 'react';
import PropTypes from 'prop-types';

const Characteristic = ({ characteristic }) => {
  const sliderStyle = {
    'margin-left': characteristic[1].percent,
  };

  return (
    <div className="char-bar-container">
      <div className="char-summary">
        {characteristic[0]}
      </div>
      <div className="rating-summary-container">
        <div className="slider-container">
          <ul className="slider-bar" role="presentation">
            <li className="slider-bar-segment left-borderless" role="presentation" />
            <li className="slider-bar-segment" role="presentation" />
            <li className="slider-bar-segment" role="presentation" />
          </ul>
          <div className="slider-value-container">
            <span className="slider-value" style={sliderStyle}><i className="fas fa-caret-down" /></span>
          </div>
        </div>
      </div>
    </div>
  );
};

Characteristic.propTypes = {
  characteristic: PropTypes.instanceOf(Array).isRequired,
};

export default Characteristic;
