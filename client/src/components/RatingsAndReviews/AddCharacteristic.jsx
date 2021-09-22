import React from 'react';
import PropTypes from 'prop-types';

const AddCharacteristic = ({ characteristic }) => {
  return (
    <div className="new-char-content">
      <div className="char-label">
        {characteristic[0]}
      </div>
      <div className="char-selections">

      </div>
    </div>
  );
};

// AddCharacteristic.propTypes = {
//   characteristic: PropTypes.instanceOf(Array).isRequired,
// };

export default AddCharacteristic;
