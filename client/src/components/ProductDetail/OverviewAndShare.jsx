// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

function OverviewAndShare(props) {
  const { product } = props;

  return (
    <div id="overview-and-share">
      <div id="product-overview">
        <span id="product-slogan"><b>{product.slogan}</b></span>
        <br />
        <span id="product-description">{product.description}</span>
      </div>
      <div id="product-social">
        <img className="social-icon" src="/assets/icon_facebook.png" alt="Facebook Icon" />
        <img className="social-icon" src="/assets/icon_instagram.png" alt="Instagram Icon" />
        <img className="social-icon" src="/assets/icon_pinterest.png" alt="Pinterest Icon" />
        <img className="social-icon" src="/assets/icon_twitter.png" alt="Twitter Icon" />
      </div>
    </div>
  );
}

OverviewAndShare.propTypes = {
  product: PropTypes.shape.isRequired,
};

export default OverviewAndShare;
