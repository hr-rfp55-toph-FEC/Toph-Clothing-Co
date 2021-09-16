import React from 'react';
import PropTypes from 'prop-types';

const SortReviews = ({ sortHandler, sortBy }) => (
  <label>
    sorted by:
    <select
      value={sortBy}
      onChange={({ target }) => { sortHandler(target.value); }}
    >
      <option value="relevant">relevant</option>
      <option value="newest">newest</option>
      <option value="helpful">helpful</option>
    </select>
  </label>
);

SortReviews.propTypes = {
  sortHandler: PropTypes.instanceOf(Function).isRequired,
  sortBy: PropTypes.string.isRequired,
};

export default SortReviews;
