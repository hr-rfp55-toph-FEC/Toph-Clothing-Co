import React from 'react';
import PropTypes from 'prop-types';

const AddCharacteristic = ({ char, handleCharRatingClick }) => {
  const scores = [1, 2, 3, 4, 5];

  return (
    <div className="new-char-content">
      <div className="new-char-heading">
        {char[0]}
      </div>
      <div className="new-char-selections">
        {scores.map((score) => (
          <label htmlFor={char[1].id}>
            <input type="radio" name={char[0]} id={char[1].id} key={char[1].id} value={score} onClick={(e) => handleCharRatingClick(e)} />
          </label>
        ))}
      </div>
    </div>
  );
};

AddCharacteristic.propTypes = {
  char: PropTypes.instanceOf(Object).isRequired,
  handleCharRatingClick: PropTypes.instanceOf(Function).isRequired,
};

export default AddCharacteristic;
