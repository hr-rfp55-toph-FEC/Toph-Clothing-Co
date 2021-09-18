import React from 'react';
import PropTypes from 'prop-types';

const TableRow = ({ row, handleStarClick }) => {
  const barStyle = {
    width: row[2],
  };

  let progressBarClassName = 'actual-progress';
  if (barStyle.width === '100%') {
    progressBarClassName = 'actual-progress-full';
  }

  return (
    <tr onClick={() => handleStarClick(row[0])}>
      <td className="align-left">
        {row[0]}
        {' '}
        {row[0] === '1' ? 'star' : 'stars'}
      </td>
      <td>
        <div className="meter-bar" role="progressbar">
          <div style={barStyle} className={progressBarClassName} />
        </div>
      </td>
      <td className="align-right">
        {row[1]}
        {' '}
        {row[1] === '0' || row[1] === '1' ? 'review' : 'reviews'}
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  row: PropTypes.instanceOf(Array).isRequired,
  handleStarClick: PropTypes.instanceOf(Function).isRequired,
};

export default TableRow;
