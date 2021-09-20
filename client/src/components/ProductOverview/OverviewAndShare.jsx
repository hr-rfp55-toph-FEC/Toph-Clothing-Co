// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

function OverviewAndShare(props) {
  const { product } = props;

  function handleSocialClick() {
    alert('Upgrade to PRO version to unlock social media sharing!');
  }

  function socialIcon(social) {
    return (<i onClick={handleSocialClick} role="presentation" className={`social-icon fab fa-${social}-square`} />
    );
  }

  return (
    <div id="overview-and-share">
      <div id="slogan-description-container">
        <span id="product-slogan"><b>{product.slogan}</b></span>
        <br />
        <span id="product-description">{product.description}</span>
      </div>
      <div id="product-social">
        {socialIcon('facebook')}
        {socialIcon('instagram')}
        {socialIcon('pinterest')}
        {socialIcon('twitter')}
      </div>
    </div>
  );
}

OverviewAndShare.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
};

export default OverviewAndShare;
