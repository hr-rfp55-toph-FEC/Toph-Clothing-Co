import React from 'react';
import Carousel from './OutfitCarousel';

const UserOutfit = ({prodsInfo, prodsStyles, prodsMeta}) => {
  console.log(prodsInfo);
  return (
    <div>
      User Outfits Here:
      <Carousel isUserOutfits={true}
        prodsInfo={prodsInfo}
        prodsStyles={prodsStyles}
        prodsMeta={prodsMeta}
      />
    </div>
  );
};

export default UserOutfit;
