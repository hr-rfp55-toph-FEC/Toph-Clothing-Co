import React from 'react';
import PropTypes from 'prop-types';

const SortReviews = ({ sortClickHandler, sortBy }) => (
  <label>
    sorted by:
    <select
      value={sortBy}
      onChange={({ target }) => { sortClickHandler(target.value); }}
      id="sort-dropdown"
    >
      <option value="relevant">relevant</option>
      <option value="newest">newest</option>
      <option value="helpful">helpful</option>
    </select>
  </label>
);

SortReviews.propTypes = {
  sortClickHandler: PropTypes.instanceOf(Function).isRequired,
  sortBy: PropTypes.string.isRequired,
};

export default SortReviews;
