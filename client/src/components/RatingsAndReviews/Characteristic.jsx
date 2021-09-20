import React from 'react';
import PropTypes from 'prop-types';

const Characteristic = ({ characteristic }) => {
  const sliderStyle = {
    marginLeft: characteristic[1].percent,
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
        <div className="char-scale-labels">
          <span id="char-scale-label-1">{characteristic[1].scale[0]}</span>
          <span id="char-scale-label-2">{characteristic[1].scale[1]}</span>
          <span id="char-scale-label-3">{characteristic[1].scale[2]}</span>
        </div>
      </div>
    </div>
  );
};

Characteristic.propTypes = {
  characteristic: PropTypes.instanceOf(Array).isRequired,
};

export default Characteristic;
