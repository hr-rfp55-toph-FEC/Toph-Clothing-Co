import React from 'react';
import PropTypes from 'prop-types';

const AddCharacteristic = ({ chars }) => {
  return (
    <div className="new-char-content">

    </div>
  );
};

AddCharacteristic.propTypes = {
  chars: PropTypes.instanceOf(Array).isRequired,
};

export default AddCharacteristic;

// {chars.map((char) => (
//   <div className="char-label">
//     {char[0]}
//   </div>
// ))}