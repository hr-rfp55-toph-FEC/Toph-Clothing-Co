import React from 'react';
import RatingTableRow from './RatingTableRow';

const RatingTable = ({ ratings }) => {
  const barStyle = {
    width: '70%',
  };
  // let ratingArr = Object.entries(ratings).reverse();
  // const totalRatingsCount = Object.values(ratings)
  //   .map((item) => Number(item))
  //   .reduce((acc, item) => (acc + item));

  return (
    <table id="rating-table">
      <tbody>
        <tr id="five-star-row">
          <td>
            <span>5 star</span>
          </td>
          <td>
            <div className="meter-bar" role="progressbar">
              <div style={barStyle}></div>
            </div>
          </td>
        </tr>
        <tr id="four-star-row">
          <td>
            <span>4 star</span>
          </td>
          <td>
            <div className="meter-bar" role="progressbar">
              <div style={barStyle}></div>
            </div>
          </td>
        </tr>
        <tr id="three-star-row">
          <td>
            <span>3 star</span>
          </td>
          <td>
            <div className="meter-bar" role="progressbar">
              <div style={barStyle}></div>
            </div>
          </td>
        </tr>
        <tr id="two-star-row">
          <td>
            <span>2 star</span>
          </td>
          <td>
            <div className="meter-bar" role="progressbar">
              <div style={barStyle}></div>
            </div>
          </td>
        </tr>
        <tr id="one-star-row">
          <td>
            <span>1 star</span>
          </td>
          <td>
            <div className="meter-bar" role="progressbar">
              <div style={barStyle}></div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default RatingTable;
