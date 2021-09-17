// import React, { useState } from 'react';
import React from 'react';
import PropTypes from 'prop-types';

function AddToCart(props) {
  const {
    productStyleSelected,
  } = props;

  console.log(productStyleSelected);
  console.log(Object.values(productStyleSelected.skus));

  // // Grab only the sizes that are in stock for current style
  // const sizesInStock = [];
  // const sizeOptions = Object.values(productStyleSelected.skus);
  // for (let i = 0; i < sizeOptions.length; i += 1) {
  //   const option = sizeOptions[i];
  //   if (option.quantity > 0) {
  //     // Handle the edge case where there are duplicate XLs - set 2nd XL equal to XXL
  //     // The 'right' way to do this is to edit the productStyle object itself; too much work for now
  //     if (option.size === 'XL' && sizesInStock.indexOf('XL') !== -1) {
  //       sizesInStock.push('XXL');
  //     } else {
  //       sizesInStock.push(option.size);
  //     }
  //   }
  // }

  // console.log(sizesInStock);

  return (
    <div id="add-to-cart" className="product-right-component">
      <div id="add-to-cart-dropdowns" className="add-to-cart-component">
        <button type="button" id="size-dropdown" className="interactive-button">Select Size</button>
        <button type="button" id="quantity-dropdown" className="interactive-button">1</button>
      </div>
      <div id="add-to-cart-buttons" className="add-to-cart-component">
        <button type="button" id="add-to-cart-button" className="interactive-button">Add To Bag</button>
        <button type="button" id="add-to-favorites-button" className="interactive-button">
          <i className="far fa-star" />
        </button>
      </div>
    </div>
  );
}

AddToCart.propTypes = {
  productStyleSelected: PropTypes.instanceOf(Object).isRequired,
};

export default AddToCart;
