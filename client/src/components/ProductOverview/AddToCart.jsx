import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function AddToCart(props) {
  const {
    product,
    productStyleSelected,
  } = props;

  const [selectedSize, setSelectedSize] = useState({});
  const [sizesInStock, setSizesInStock] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  // Grab only the sizes in stock for current style.
  useEffect(() => {
    const sizeOptions = Object.entries(productStyleSelected.skus);
    const sizeOptionsFiltered = {};
    for (let i = 0; i < sizeOptions.length; i += 1) {
      const sku = sizeOptions[i][0];
      const option = sizeOptions[i][1];
      if (option.quantity > 0) {
        // Handle the data issue where there are duplicate XLs - set 2nd XL equal to XXL
        if (option.size === 'XL'
          && Object.values(sizeOptionsFiltered).map((optionFiltered) => optionFiltered.size).indexOf('XL') !== -1) {
          option.size = 'XXL';
        }
        sizeOptionsFiltered[sku] = option;
      }
    }
    setSizesInStock(sizeOptionsFiltered);
    setIsLoading(false);
  }, [productStyleSelected, isLoading]);

  function disabledSizeSelector(message) {
    return (
      <select disabled defaultValue={message} id="size-dropdown" className="interactive-button-copy-disabled">
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
    setShowError(false);
  }

  function handleAddToBag() {
    const selectedQuantity = document.getElementById('quantity-dropdown').value;
    if (!isLoading) {
      if (Object.values(selectedSize).length === 0) {
        setShowError(true);
      } else if (selectedQuantity >= 1 && selectedQuantity <= 15) {
        const item = {
          product,
          style: productStyleSelected,
          sku_id: Number.parseInt(selectedSize.sku, 10),
          size: selectedSize.size,
          quantity: selectedQuantity,
        };
        alert(`Added to Cart!
        \n ${item.product.name}
        \n ${item.style.name}
        \n ${item.sku_id}
        \n ${item.size}
        \n ${item.quantity}
        \n ${item.style.sale_price ? item.style.sale_price : item.style.original_price}`);
      }
    }
  }

  return (
    <div id="add-to-cart" className="product-right-component">
      <div id="add-to-cart-dropdown-container">
        <div id="add-to-cart-error-container">
          {showError
            && (
              <div id="add-to-cart-error-message">
                <em>PLEASE SELECT A SIZE</em>
              </div>
            )}
        </div>
        <div id="add-to-cart-dropdowns" className="add-to-cart-component">
          {isLoading
            && disabledSizeSelector('SELECT SIZE')}
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
              <select disabled defaultValue="—" id="quantity-dropdown" className="interactive-button-copy-disabled">
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
      </div>
      {!isLoading && Object.values(sizesInStock).length === 0
        ? null
        : (
          <div id="add-to-cart-buttons" className="add-to-cart-component">
            <button type="button" id="add-to-cart-button" className="interactive-button-copy" onClick={handleAddToBag}>
              <span>Add To Bag</span>
              <span>&#65291;</span>
            </button>
            <button type="button" id="add-to-favorites-button" className="interactive-button-copy">
              &#128722;
            </button>
          </div>
        )}
    </div>
  );
}

AddToCart.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  productStyleSelected: PropTypes.instanceOf(Object).isRequired,
};

export default AddToCart;
