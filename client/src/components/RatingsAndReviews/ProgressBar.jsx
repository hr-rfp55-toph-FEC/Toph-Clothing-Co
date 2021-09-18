import React from 'react';

const ProgressBar = ({ percentage }) => {
  const barStyle = {
    height: '12px',
    width: '70%',
  };

  return (
    <td>
      <div className="meter-bar" role="progressbar">
        <div style={barStyle} className="actual-progress" />
      </div>
    </td>
  );
};

export default ProgressBar;
