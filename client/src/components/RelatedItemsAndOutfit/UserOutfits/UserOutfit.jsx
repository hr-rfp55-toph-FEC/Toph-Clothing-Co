import React from 'react';
import OutfitCarousel from './OutfitCarousel';

const UserOutfit = ({prodsInfo, prodsStyles, prodsMeta}) => (
  <div>
    User Outfits Here:
    <OutfitCarousel isUserOutfits={true}
      prodsInfo={prodsInfo}
      prodsStyles={prodsStyles}
      prodsMeta={prodsMeta}
    />
  </div>
);

export default UserOutfit;
