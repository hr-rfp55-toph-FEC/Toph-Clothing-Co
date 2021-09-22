import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddCharacteristic = ({ char, handleCharRatingClick }) => {
  const scores = [1, 2, 3, 4, 5];

  const [showCharLabel, setShowCharLabel] = useState([false, false, false, false, false]);

  let charLabel = 'none selected';
  showCharLabel.forEach((value, index) => {
    if (value) {
      charLabel = char[1].scale[index];
    }
  });

  return (
    <div className="new-char-content">
      <div className="new-char-heading">
        {char[0]}
      </div>
      <span id="selected-char-label">{charLabel}</span>
      <div className="new-char-selections">
        {scores.map((score) => (
          <label htmlFor={char[1].id}>
            {/* {input.checked ? char[1].scale[score - 1] : 'none selected'} */}
            <input
              type="radio"
              name={char[0]}
              id={char[1].id}
              key={char[1].id}
              value={score}
              onClick={(e) => {
                handleCharRatingClick(char[1].id, e);
                const copy = [false, false, false, false, false];
                copy[score - 1] = true;
                setShowCharLabel(copy);
              }}
            />
          </label>
        ))}
        <div className="always-displayed-labels">
          <span>{char[1].scale[0]}</span>
          <span>{char[1].scale[4]}</span>
        </div>
      </div>
    </div>
  );
};

AddCharacteristic.propTypes = {
  char: PropTypes.instanceOf(Object).isRequired,
  handleCharRatingClick: PropTypes.instanceOf(Function).isRequired,
};

export default AddCharacteristic;
