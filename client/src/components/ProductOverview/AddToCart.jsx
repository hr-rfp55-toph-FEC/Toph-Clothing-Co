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
    // setSelectedSize({});
    // setSizesInStock({});
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
        // // Using size instead of SKU as the key is cleaner for code re-use,
        // // ...but causes shoe sizes to display out of order
        // sizeOptionsFiltered[option.size] = {
        //   sku,
        //   quantity: option.quantity,
        //   size: option.size,
        // };
      }
    }
    setSizesInStock(sizeOptionsFiltered);
    setIsLoading(false); // This is ok, hooks don't trigger re-renders when state is unchanged
    // console.log('sizeOptionsFiltered', sizeOptionsFiltered);
  }, [productStyleSelected, isLoading]);

  // useEffect(() => {
  //   const quantity = selectedSize.quantity;
  //   console.log(quantity);
  // });

  // console.log('sizesInStock', sizesInStock);

  function disabledSizeSelector(message) {
    return (
      <select disabled defaultValue={message} id="size-dropdown" className="interactive-button-copy">
        <option disabled hidden value={message}>{message}</option>
      </select>
    );
  }

  function handleSizeSelector(event) {
    let targetedSize = {};
    const sizesInStockEntries = Object.entries(sizesInStock);
    for (let i = 0; i < sizesInStockEntries.length; i += 1) {
      const sku = sizesInStockEntries[i][0];
      const option = sizesInStockEntries[i][1];
      if (option.size === event.target.value) {
        targetedSize = {
          sku,
          quantity: option.quantity,
          size: option.size,
        };
      }
    }
    setSelectedSize(targetedSize);
  }

  // console.log('selectedSize', selectedSize);

  return (
    <div id="add-to-cart" className="product-right-component">
      <div id="add-to-cart-dropdowns" className="add-to-cart-component">
        {isLoading && disabledSizeSelector('SELECT SIZE')}
        {!isLoading
          && (Object.values(sizesInStock).length === 0
            ? disabledSizeSelector('OUT OF STOCK')
            : (
              <select defaultValue="Select Size" id="size-dropdown" className="interactive-button-copy" onChange={handleSizeSelector}>
                <option disabled hidden value="Select Size">SELECT SIZE</option>
                {Object.values(sizesInStock)
                  .map((size) => <option key={size.size}>{size.size}</option>)}
              </select>
            ))}
        {Object.values(selectedSize).length === 0
          ? (
            <select disabled defaultValue="—" id="quantity-dropdown" className="interactive-button-copy">
              <option disabled hidden value="—">—</option>
            </select>
          )
          : (
            <select id="quantity-dropdown" className="interactive-button-copy">
              {[...Array(Math.min(selectedSize.quantity + 1, 16)).keys()]
                .slice(1)
                .map((quantity) => <option key={quantity}>{quantity}</option>)}
            </select>
          )}
      </div>
      {!isLoading && Object.values(sizesInStock).length === 0
        ? null
        : (
          <div id="add-to-cart-buttons" className="add-to-cart-component">
            <button type="button" id="add-to-cart-button" className="interactive-button-copy">Add To Bag</button>
            <button type="button" id="add-to-favorites-button" className="interactive-button-copy">
              <i className="far fa-star" />
            </button>
          </div>
        )}
    </div>
  );
}

AddToCart.propTypes = {
  productStyleSelected: PropTypes.instanceOf(Object).isRequired,
};

export default AddToCart;
