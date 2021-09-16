import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from './Carousel';
import AddOutfitCard from './AddOutfitCard';
import OutfitListCard from './OutfitListCard';

const UserOutfit = ({ currProd, prodsInfo, prodsStyles, prodsMeta }) => {
  const [currOutfits, setCurrOutfits] = useState([]);
  const addToCurrOutfits = (e) => {
    e.preventDefault();
    setCurrOutfits((oldList) => [...oldList, currProd]);
  };
  const removeOutfit = (idToRemove) => {
    const adjustedCurrOutFits = currOutfits.filter((outfit) => outfit[0].id !== idToRemove);
    setCurrOutfits(adjustedCurrOutFits);
  };
  return (
  <div className="outfit-list-container">
    Related Products Here:
    <Carousel prodsInfo={prodsInfo} prodsStyles={prodsStyles} prodsMeta={prodsMeta}>
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
  prodsInfo: PropTypes.instanceOf(Object).isRequired,
  prodsStyles: PropTypes.instanceOf(Object).isRequired,
  prodsMeta: PropTypes.instanceOf(Object).isRequired,
};

export default UserOutfit;
