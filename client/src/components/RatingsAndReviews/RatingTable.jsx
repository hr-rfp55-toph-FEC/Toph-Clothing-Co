import React from 'react';
import PropTypes from 'prop-types';
import ProgressBar from './ProgressBar';

const RatingTable = ({ ratings }) => (
  <table>
    <tbody>
      <tr id="five-star-row">
        <td>
          <span>5 star</span>
          <span className="a-letter-space" />
        </td>
        <ProgressBar />
      </tr>
      <tr id="four-star-row">
        <td>
          <span>4 star</span>
        </td>
        <td>
          <div className="meter-bar" role="progressbar">
            <div></div>
          </div>
        </td>
      </tr>
      <tr id="three-star-row">
        <td>
          <span>3 star</span>
        </td>
        <td>
          <div className="meter-bar" role="progressbar">
            <div></div>
          </div>
        </td>
      </tr>
      <tr id="two-star-row">
        <td>
          <span>2 star</span>
        </td>
        <td>
          <div className="meter-bar" role="progressbar">
            <div></div>
          </div>
        </td>
      </tr>
      <tr id="one-star-row">
        <td>
          <span>1 star</span>
        </td>
        <td>
          <div className="meter-bar" role="progressbar">
            <div></div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
);

RatingTable.propTypes = {
  ratings: PropTypes.instanceOf(Object).isRequired,
};

export default RatingTable;
