// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

function OverviewAndShare(props) {
  const { product } = props;

  function handleSocialClick() {
    alert('Upgrade to PRO version to unlock social media sharing!');
  }

  function socialIcon(social) {
    return (<img className="social-icon" src={`/assets/icon_${social.toLowerCase()}.png`} alt={`${social} Icon`} onClick={handleSocialClick} role="presentation" />);
  }

  return (
    <div id="overview-and-share">
      <div id="slogan-description-container">
        <span id="product-slogan"><b>{product.slogan}</b></span>
        <br />
        <span id="product-description">{product.description}</span>
      </div>
      <div id="product-social">
        {socialIcon('Facebook')}
        {socialIcon('Instagram')}
        {socialIcon('Pinterest')}
        {socialIcon('Twitter')}
      </div>
    </div>
  );
}

OverviewAndShare.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
};

export default OverviewAndShare;
