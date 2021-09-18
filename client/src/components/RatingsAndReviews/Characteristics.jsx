import React from 'react';
import PropTypes from 'prop-types';

const Characteristics = ({ characteristics }) => {
  return (
    <div className="char-bar-container">
      <div className="char-summary">
        hello
      </div>
    </div>
  )
};

Characteristics.propTypes = {
  characteristics: PropTypes.instanceOf(Object).isRequired,
};

export default Characteristics;
