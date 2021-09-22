import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddCharacteristic = ({ char, handleCharRatingClick }) => {
  const scores = [1, 2, 3, 4, 5];

  const [whichCharLabel, setWhichCharLabel] = useState([false, false, false, false, false]);

  let charLabel = 'none selected';
  whichCharLabel.forEach((value, index) => {
    if (value) {
      charLabel = char[1].labels[index];
    }
  });

  return (
    <div className="new-char-content">
      <div className="new-char-heading">
        {char[0]}
      </div>
      <span className="selected-char-label">{charLabel}</span>
      <div className="new-char-selections">
        {scores.map((score) => (
          <input
            type="radio"
            name={char[0]}
            id={char[1].id}
            value={score}
            required="required"
            onClick={(e) => {
              handleCharRatingClick(char[1].id, e);
              const copy = [false, false, false, false, false];
              copy[score - 1] = true;
              setWhichCharLabel(copy);
            }}
          />
        ))}
      </div>
      <div className="always-displayed-labels">
        <span id="always-displayed-label-start">{char[1].labels[0]}</span>
        <span id="always-displayed-label-end">{char[1].labels[4]}</span>
      </div>
    </div>
  );
};

AddCharacteristic.propTypes = {
  char: PropTypes.instanceOf(Object).isRequired,
  handleCharRatingClick: PropTypes.instanceOf(Function).isRequired,
};

export default AddCharacteristic;
