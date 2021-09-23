import React from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';

import ImageGallery from './ImageGallery';
import ProductInformation from './ProductInformation';
import StyleSelector from './StyleSelector';
import AddToCart from './AddToCart';
import OverviewAndShare from './OverviewAndShare';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      zoomed: false,
    };

    this.handleExpand = this.handleExpand.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
  }

  handleExpand() {
    const { expanded } = this.state;
    this.setState({ expanded: !expanded });
  }

  handleZoom() {
    const { zoomed } = this.state;
    this.setState({ zoomed: !zoomed });
  }

  render() {
    const {
      product,
      productStyles,
      productStyleSelected,
      productReviews,
      productRatings,
      selectProductStyle,
    } = this.props;

    const { expanded } = this.state;
    const { zoomed } = this.state;

    return (
      <div id="product-main-container">
        <div id="product-upper-container">
          <ImageGallery
            productStyleSelected={productStyleSelected}
            expanded={expanded}
            zoomed={zoomed}
            handleExpand={this.handleExpand}
            handleZoom={this.handleZoom}
          />
          <div id="product-right-container" className={expanded ? 'product-right-container-hidden' : ''}>
            <ProductInformation
              product={product}
              productReviews={productReviews}
              productRatings={productRatings}
              productStyleSelected={productStyleSelected}
            />
            <StyleSelector
              productStyles={productStyles}
              productStyleSelected={productStyleSelected}
              selectProductStyle={selectProductStyle}
              // selectProductStyle={this.selectProductStyle}
            />
            <AddToCart
              product={product}
              productStyleSelected={productStyleSelected}
              key={productStyleSelected.style_id}
            />
          </div>
        </div>
        <OverviewAndShare product={product} />
      </div>
    );
  }
}

ProductOverview.propTypes = {
  product: PropTypes.instanceOf(Object).isRequired,
  productStyles: PropTypes.instanceOf(Object).isRequired,
  productStyleSelected: PropTypes.instanceOf(Object).isRequired,
  productReviews: PropTypes.instanceOf(Object).isRequired,
  productRatings: PropTypes.instanceOf(Object).isRequired,
  selectProductStyle: PropTypes.func.isRequired,
};

export default ProductOverview;
