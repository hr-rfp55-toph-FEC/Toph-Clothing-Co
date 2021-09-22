import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from '../Carousel';
import AddOutfitCard from './AddOutFitCard';
import ListCard from '../ListCard';

const UserOutfit = ({ currProd, changeProductHandler, prodStyleSelected }) => {
  const [currOutfits, setCurrOutfits] = useState([]);
  const [styleIds, setStyleIds] = useState([]);
  // const prodStyleSelected = prodStyleSelected.style_id;
  // console.log(prodStyleSelected);
  const addToCurrOutfits = (e) => {
    e.preventDefault();
    const currProdStyleId = prodStyleSelected.style_id;
    let alreadyAdded = false;
    styleIds.forEach((id) => {
      if (currProdStyleId === id) {
        alreadyAdded = true;
      }
    });
    if (alreadyAdded) return;
    setStyleIds((prevIds) => [...prevIds, currProdStyleId]);
    // currOutfits.forEach((outfit) => {
    //   if (outfit[0].id === currProd[0].id) {
    //     alreadyAdded = true;
    //   }
    // });
    const [product, styles, metaData] = currProd;
    // console.log(product, styles, metaData, 'currProd here');
    const prod = [product, prodStyleSelected, metaData];
    console.log(prod, 'new array');
    setCurrOutfits((oldList) => [...oldList, prod]);
  };
  console.log(currOutfits, 'current outfits');
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
            //change the productStyle sent to card
            prodStyles={outfit[1]}
            prodMeta={outfit[2]}
            onRelatedCardClick={changeProductHandler}
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
  changeProductHandler: PropTypes.func.isRequired,
};

export default UserOutfit;
