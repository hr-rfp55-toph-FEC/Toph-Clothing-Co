import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Carousel from '../Carousel';
import AddOutfitCard from './AddOutFitCard';
import ListCard from '../ListCard';

const UserOutfit = ({ currProd, changeProductHandler, prodStyleSelected }) => {
  const [currOutfits, setCurrOutfits] = useState([]);
  const [styleIds, setStyleIds] = useState([]);
  console.log('currprodId', currProd);
  useEffect(() => {
    if (!currOutfits.length) {
      const cachedOutfits = [];
      const cachedIds = [...Object.keys(localStorage)];
      Object.entries(localStorage).forEach((entry) => cachedOutfits.push(JSON.parse(entry[1])));
      setCurrOutfits(cachedOutfits);
      setStyleIds(cachedIds);
    }
  }, [currOutfits.length]);

  const addToCurrOutfits = (e) => {
    e.preventDefault();
    const currProdStyleId = prodStyleSelected.style_id;
    let alreadyAdded = false;
    styleIds.forEach((id) => {
      if (Number(currProdStyleId) === Number(id)) {
        if (alreadyAdded) return;
        alreadyAdded = true;
      }
    });
    if (alreadyAdded) return;

    setStyleIds((prevIds) => [...prevIds, currProdStyleId]);
    const [product, styles, metaData] = currProd;
    const prod = [product, prodStyleSelected, metaData];
    setCurrOutfits((oldList) => [...oldList, prod]);
    window.localStorage.setItem(currProdStyleId, JSON.stringify(prod));
  };

  const removeOutfit = (idToRemove) => {
    const adjustedCurrOutFits = currOutfits.filter((outfit) => outfit[1].style_id !== idToRemove);
    const adjustedSelectedStyleIds = styleIds.filter((id) => id !== idToRemove);
    setCurrOutfits(adjustedCurrOutFits);
    setStyleIds(adjustedSelectedStyleIds);
    window.localStorage.removeItem(idToRemove);
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
            key={`${outfit[0].id}BG${Math.random() * 100000}`}
            prodInfo={outfit[0]}
            prodStyles={outfit[1]}
            prodMeta={outfit[2]}
            changeProductHandler={changeProductHandler}
          >
            <button onClick={() => removeOutfit(outfit[1].style_id)} type="button" className="remove-card-button">
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

const areEqual = (prevProps, nextProps) => {
  // console.log(prevProps, nextProps, 'areEqual memo in RelatedOutfits');
  if (prevProps.currProd[0].id === nextProps.currProd[0].id) {
    return true;
  }
  return false;
};

export default React.memo(UserOutfit, areEqual);
