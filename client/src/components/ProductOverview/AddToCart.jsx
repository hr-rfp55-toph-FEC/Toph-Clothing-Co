import React, { useState, useEffect } from 'react';
// import React from 'react';
import PropTypes from 'prop-types';

function AddToCart(props) {
  const {
    productStyleSelected,
  } = props;

  const [selectedSize, setSelectedSize] = useState({});
  const [sizesInStock, setSizesInStock] = useState({});

  // Grab only the sizes in stock for current style. Using Object.entries() to appease linter.
  useEffect(() => {
    // console.log('productStyleSelected', productStyleSelected);
    // console.log('productStyleSelected SKUs', productStyleSelected.skus);
    // console.log('Object.values of SKUs', Object.values(productStyleSelected.skus));
    const sizeOptions = Object.entries(productStyleSelected.skus);
    // console.log('sizeOptions', sizeOptions);
    const sizeOptionsFiltered = {};
    for (let i = 0; i < sizeOptions.length; i += 1) {
      const sku = sizeOptions[i][0];
      const option = sizeOptions[i][1];
      // console.log(sku);
      // console.log(option);
      if (option.quantity > 0) {
        // Handle the edge case where there are duplicate XLs - set 2nd XL equal to XXL
        // The right way to do this is to edit the productStyle object itself; too much work for now
        if (option.size === 'XL'
          && Object.values(sizeOptionsFiltered).map((optionFiltered) => optionFiltered.size).indexOf('XL') !== -1) {
          option.size = 'XXL';
        }
        sizeOptionsFiltered[sku] = option;
      }
    }
    setSizesInStock(sizeOptionsFiltered);
    console.log('sizeOptionsFiltered', sizeOptionsFiltered);
  }, [productStyleSelected]);

  // console.log('sizesInStock', sizesInStock);

  return (
    <div id="add-to-cart" className="product-right-component">
      <div id="add-to-cart-dropdowns" className="add-to-cart-component">
        {Object.values(sizesInStock).length === 0
          ? (
            <select disabled defaultValue="Out of Stock" id="size-dropdown" className="interactive-button">
              <option disabled hidden value="Out of Stock">OUT OF STOCK</option>
            </select>
          )
          : (
            <select defaultValue="Select Size" id="size-dropdown" className="interactive-button">
              <option disabled hidden value="Select Size">SELECT SIZE</option>
              {Object.values(sizesInStock)
                .map((size) => <option key={size.size}>{size.size}</option>)}
            </select>
          )}
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
