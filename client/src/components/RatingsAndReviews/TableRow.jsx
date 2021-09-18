import React from 'react';
import PropTypes from 'prop-types';

const TableRow = ({ row }) => {
  const barStyle = {
    width: row[2],
  };

  return (
    <tr>
      <td className="align-left">
        {row[0]}
        {' '}
        stars
      </td>
      <td>
        <div className="meter-bar" role="progressbar">
          <div style={barStyle} className="actual-progress" />
        </div>
      </td>
      <td className="align-right">
        {row[1]}
        {' '}
        reviews
      </td>
    </tr>
  );
};

TableRow.propTypes = {
  row: PropTypes.instanceOf(Array).isRequired,
};

export default TableRow;
