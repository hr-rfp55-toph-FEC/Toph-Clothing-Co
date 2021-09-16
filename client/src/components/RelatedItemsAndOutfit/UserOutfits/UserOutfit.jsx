import React from 'react';
import PropTypes from 'prop-types';
import OutfitCarousel from './OutfitCarousel';

const UserOutfit = ({ prodsInfo, prodsStyles, prodsMeta }) => (
  <div>
    Related Products Here:
    <OutfitCarousel prodsInfo={prodsInfo} prodsStyles={prodsStyles} prodsMeta={prodsMeta} />
  </div>
);

UserOutfit.propTypes = {
  prodsInfo: PropTypes.instanceOf(Object).isRequired,
  prodsStyles: PropTypes.instanceOf(Object).isRequired,
  prodsMeta: PropTypes.instanceOf(Object).isRequired,
};

export default UserOutfit;
