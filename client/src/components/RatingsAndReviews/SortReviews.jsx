import React, { useState } from 'react';

const SortReviews = () => {
  const [value, setValue] = useState('relevance');

  return (
    <select
      value={value}
      onChange={({ target }) => { setValue(target.value); }}
    >
      <option value="relevance">relevance</option>
      <option value="newest">newest</option>
      <option value="helpful">helpful</option>
    </select>
  );
};

export default SortReviews;
