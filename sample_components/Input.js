import React, { useState } from 'react';

const Input = ({ id = '', label = '', type = 'text' }) => {
  const [value, handleChange] = useState('');
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        data-testid={id}
        label={label}
        onChange={({ target }) => {
          handleChange(target.value);
        }}
        value={value}
      />
    </div>
  );
};

export default Input;
