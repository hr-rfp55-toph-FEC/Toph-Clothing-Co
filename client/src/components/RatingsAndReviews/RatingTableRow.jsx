import React from 'react';

const RatingTableRow = ({ row }) => (
  <tr>
    <td>
      <span>{row[0]} star</span>
    </td>
    <td>
      <div className="meter-bar" role="progressbar">
        <div style={barStyle}></div>
      </div>
    </td>
  </tr>
)

export default RatingTableRow;
