import React from 'react';
import Carousel from './Carousel';

const UserOutfit = ({prodsInfo, prodsStyles, prodsMeta}) => {
  const placeholder = prodsInfo;
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
