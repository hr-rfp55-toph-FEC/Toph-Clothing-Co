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
  prodsInfo: PropTypes.isInstanceOf(Array).isRequired,
  prodsStyles: PropTypes.isInstanceOf(Array).isRequired,
  prodsMeta: PropTypes.isInstanceOf(Array).isRequired,
};

export default UserOutfit;
