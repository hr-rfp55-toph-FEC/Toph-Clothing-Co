import React from 'react';
import PropTypes from 'prop-types';
import Carousel from './Carousel';
import OutfitListCard from './OutfitListCard';

const UserOutfit = ({ prodsInfo, prodsStyles, prodsMeta }) => {


  return (
  <div className="outfit-list-container">
    Related Products Here:
    <Carousel prodsInfo={prodsInfo} prodsStyles={prodsStyles} prodsMeta={prodsMeta} >
      {prodsInfo.map((prodInfo, index) => (
        <OutfitListCard
          key={prodInfo.id}
          prodInfo={prodInfo}
          prodStyles={prodsStyles[index]}
          prodMeta={prodsMeta[index]}
        />
      ))}
    </Carousel>
  </div>
)}

UserOutfit.propTypes = {
  prodsInfo: PropTypes.instanceOf(Object).isRequired,
  prodsStyles: PropTypes.instanceOf(Object).isRequired,
  prodsMeta: PropTypes.instanceOf(Object).isRequired,
};

export default UserOutfit;
