import React from 'react';

function Banner() {
  return (
    <div>
      <div className="titlebar">
        <img className="logo" src="/assets/logo2.png" alt="logo Icon" />
        <input className="product-search" type="text" />
      </div>
      <div className="mini-banner"> END OF SUMMER SALE! BUY ONE GET ONE 50% OFF!</div>
    </div>
  );
}

export default Banner;
