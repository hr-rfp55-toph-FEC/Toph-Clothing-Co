import React, { useState, useEffect } from 'react';
// import React from 'react';
import PropTypes from 'prop-types';

function AddToCart(props) {
  const {
    productStyleSelected,
  } = props;

  const [selectedSize, setSelectedSize] = useState({});
  const [sizesInStock, setSizesInStock] = useState({});
  const [isLoading, setIsLoading] = useState(true);

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
        // Use size instead of SKU as key to allow for easier use. TBD if this causes issues.
        sizeOptionsFiltered[option.size] = {
          sku,
          quantity: option.quantity,
          size: option.size,
        };
      }
    }
    setSizesInStock(sizeOptionsFiltered);
    setIsLoading(false); // This is ok, hooks don't trigger re-renders when state is unchanged
    console.log('sizeOptionsFiltered', sizeOptionsFiltered);
  }, [productStyleSelected, isLoading]);

  // console.log('sizesInStock', sizesInStock);

  function disabledSizeSelector(message) {
    return (
      <select disabled defaultValue={message} id="size-dropdown" className="interactive-button">
        <option disabled hidden value={message}>{message}</option>
      </select>
    );
  }

  function handleSizeSelector(event) {
    setSelectedSize(sizesInStock[event.target.value]);
  }

  // console.log('selectedSize', selectedSize);

  return (
    <div id="add-to-cart" className="product-right-component">
      <div id="add-to-cart-dropdowns" className="add-to-cart-component">
        {isLoading && disabledSizeSelector('LOADING...')}
        {!isLoading
          && (Object.values(sizesInStock).length === 0
            ? disabledSizeSelector('OUT OF STOCK')
            : (
              <select defaultValue="Select Size" id="size-dropdown" className="interactive-button" onChange={handleSizeSelector}>
                <option disabled hidden value="Select Size">SELECT SIZE</option>
                {Object.values(sizesInStock)
                  .map((size) => <option key={size.size}>{size.size}</option>)}
              </select>
            ))}
        {Object.values(selectedSize).length === 0
          ? (
            <select disabled defaultValue="—" id="quantity-dropdown" className="interactive-button">
              <option disabled hidden value="—">—</option>
            </select>
          )
          : (
            <select defaultValue="Quantity Dropdown" id="quantity-dropdown" className="interactive-button">
              <option disabled hidden value="Quantity Dropdown">1</option>
              {/* {Object.values(sizesInStock)
                .map((size) => <option key={size.size}>{size.size}</option>)} */}
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
};

export default AddToCart;
