import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from '../Carousel';
import AddOutfitCard from './AddOutFitCard';
import ListCard from '../ListCard';

const UserOutfit = ({ currProd, onRelatedCardClick }) => {
  const [currOutfits, setCurrOutfits] = useState([]);
  const addToCurrOutfits = (e) => {
    e.preventDefault();
    let alreadyAdded = false;
    currOutfits.forEach((outfit) => {
      if (outfit[0].id === currProd[0].id) {
        alreadyAdded = true;
      }
    });
    if (alreadyAdded) return;
    setCurrOutfits((oldList) => [...oldList, currProd]);
  };
  const removeOutfit = (idToRemove) => {
    const adjustedCurrOutFits = currOutfits.filter((outfit) => outfit[0].id !== idToRemove);
    setCurrOutfits(adjustedCurrOutFits);
  };
  return (
    <div className="outfit-list-container">
      <h2 className="user-outfit-header" id="ratings-reviews-title">YOUR OUTFIT</h2>
      <Carousel>
        <AddOutfitCard
          addToCurrOutfits={addToCurrOutfits}
        />
        {currOutfits.map((outfit) => (
          <ListCard
            key={outfit[0].id}
            prodInfo={outfit[0]}
            prodStyles={outfit[1]}
            prodMeta={outfit[2]}
            onRelatedCardClick={onRelatedCardClick}
          >
            <button onClick={() => removeOutfit(outfit[0].id)} type="button" className="remove-card-button">
              <i className="far fa-window-close" />
            </button>
          </ListCard>
        ))}
      </Carousel>
    </div>
  );
};

UserOutfit.propTypes = {
  currProd: PropTypes.instanceOf(Array).isRequired,
  onRelatedCardClick: PropTypes.instanceOf(Function).isRequired,
};

export default UserOutfit;
