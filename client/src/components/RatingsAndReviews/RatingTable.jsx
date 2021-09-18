import React from 'react';
import PropTypes from 'prop-types';
import TableRow from './TableRow';

const RatingTable = ({ ratings }) => (
  <table>
    {ratings.map((row) => (
      <TableRow row={row} />
    ))}
  </table>
);

RatingTable.propTypes = {
  ratings: PropTypes.instanceOf(Array).isRequired,
};

export default RatingTable;
