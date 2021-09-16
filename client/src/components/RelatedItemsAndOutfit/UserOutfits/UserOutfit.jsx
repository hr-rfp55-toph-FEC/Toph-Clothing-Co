import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from '../Carousel';
import AddOutfitCard from './AddOutFitCard';
import OutfitListCard from './OutfitListCard';

const UserOutfit = ({ currProd }) => {
  const [currOutfits, setCurrOutfits] = useState([]);
  const addToCurrOutfits = (e) => {
    e.preventDefault();
    let alreadyAdded = false;
    // currOutfits.forEach((outfit) => {
    //   if (outfit[0].id === currProd[0].id) {
    //     alreadyAdded = true;
    //   }
    // });
    // if (alreadyAdded) return;
    setCurrOutfits((oldList) => [...oldList, currProd]);
  };
  const removeOutfit = (idToRemove) => {
    const adjustedCurrOutFits = currOutfits.filter((outfit) => outfit[0].id !== idToRemove);
    setCurrOutfits(adjustedCurrOutFits);
  };
  return (
  <div className="outfit-list-container">
    Related Products Here:
    <Carousel>
      <AddOutfitCard
        addToCurrOutfits={addToCurrOutfits}
      />
      {currOutfits.map((outfit) => (
        <OutfitListCard
          key={outfit[0].id}
          prodInfo={outfit[0]}
          prodStyles={outfit[1]}
          prodMeta={outfit[2]}
          removeOutfit={removeOutfit}
        />
      ))}
    </Carousel>
  </div>
)}

UserOutfit.propTypes = {
  currProd: PropTypes.instanceOf(Array).isRequired,
};

export default UserOutfit;
