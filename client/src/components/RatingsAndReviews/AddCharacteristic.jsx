import React, { useState } from 'react';
import PropTypes from 'prop-types';

const AddCharacteristic = ({ char, handleCharRatingClick }) => {
  const scores = [1, 2, 3, 4, 5];

  const [whichCharLabel, setWhichCharLabel] = useState([false, false, false, false, false]);

  let charLabel = 'none selected';
  // let radioClass = 'far fa-circle';
  whichCharLabel.forEach((value, index) => {
    if (value) {
      charLabel = char[1].labels[index];
      // radioClass = 'far fa-check-circle';
    }
  });
  // setRadioClass('far fa-check-circle');

  return (
    <div className="new-char-content">
      <div className="new-char-heading asterisk-wrapper">
        {char[0]}
        <span className="required-review-mark">
          <i className="fas fa-asterisk" />
        </span>
      </div>
      <span className="selected-char-label">
        {charLabel}
      </span>
      <div className="new-char-selections radio-button-container">
        {scores.map((score) => (
          <td>
            <label htmlFor={char[1].id}>
              <input
                type="radio"
                name={char[0]}
                id={char[1].id}
                value={score}
                required
                onClick={(e) => {
                  handleCharRatingClick(char[1].id, e);
                  const copy = [false, false, false, false, false];
                  copy[score - 1] = true;
                  setWhichCharLabel(copy);
                }}
              />
              {score === 1 ? char[1].labels[0] : null}
              {score === 5 ? char[1].labels[4] : null}
            </label>
          </td>
          /* <i className={radioClass} /> */
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
