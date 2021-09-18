import React, { useState } from 'react';
// import React, { useState, useEffect } from 'react';
// import React from 'react';
import PropTypes from 'prop-types';

function AddToCart(props) {
  const {
    productStyleSelected,
    sizesInStock,
    selectedSize,
    selectSize,
  } = props;

  // const [isLoading, setIsLoading] = useState(true);

  // // Grab only the sizes in stock for current style. Using Object.entries() to appease linter.
  // useEffect(() => {
  //   // setSelectedSize({});
  //   // setSizesInStock({});
  //   console.log('productStyleSelected', productStyleSelected);
  //   // console.log('productStyleSelected SKUs', productStyleSelected.skus);
  //   // console.log('Object.values of SKUs', Object.values(productStyleSelected.skus));

  //   setIsLoading(false); // This is ok, hooks don't trigger re-renders when state is unchanged
  //   console.log('sizeOptionsFiltered', sizeOptionsFiltered);
  // }, [productStyleSelected, isLoading]);

  // useEffect(() => {
  //   const quantity = selectedSize.quantity;
  //   console.log(quantity);
  // });

  // console.log('productStyleSelected', productStyleSelected);
  // console.log('sizesInStock', sizesInStock);

  function disabledSizeSelector(message) {
    return (
      <select disabled defaultValue={message} id="size-dropdown" className="interactive-button">
        <option disabled hidden value={message}>{message}</option>
      </select>
    );
  }

  function handleSizeSelector(event) {
    selectSize(event.target.value);
  }

  // console.log('selectedSize', selectedSize);

  return (
    <div id="add-to-cart" className="product-right-component">
      <div id="add-to-cart-dropdowns" className="add-to-cart-component">
        {Object.values(sizesInStock).length === 0
          ? disabledSizeSelector('OUT OF STOCK')
          : (
            <select defaultValue="Select Size" id="size-dropdown" className="interactive-button" onChange={handleSizeSelector}>
              <option disabled hidden value="Select Size">SELECT SIZE</option>
              {Object.values(sizesInStock)
                .map((size) => <option key={size.size}>{size.size}</option>)}
            </select>
          )}
        {Object.values(selectedSize).length === 0
          ? (
            <select disabled defaultValue="—" id="quantity-dropdown" className="interactive-button">
              <option disabled hidden value="—">—</option>
            </select>
          )
          : (
            <select id="quantity-dropdown" className="interactive-button">
              {[...Array(Math.min(selectedSize.quantity + 1, 16)).keys()]
                .slice(1)
                .map((quantity) => <option key={quantity}>{quantity}</option>)}
            </select>
          )}
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
  sizesInStock: PropTypes.instanceOf(Object).isRequired,
  selectedSize: PropTypes.instanceOf(Object).isRequired,
  selectSize: PropTypes.func.isRequired,
};

export default AddToCart;
