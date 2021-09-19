import React from 'react';
import axios from 'axios';

import ImageGallery from './ImageGallery';
import ProductInformation from './ProductInformation';
import StyleSelector from './StyleSelector';
import AddToCart from './AddToCart';
import OverviewAndShare from './OverviewAndShare';

class ProductOverview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFetching: true,
      expanded: false,
      product: {},
      productStyles: {},
      productReviews: {},
      productRatings: {},
      productStyleSelected: {},
    };

    this.selectProductStyle = this.selectProductStyle.bind(this);
  }

  componentDidMount() {
    Promise.all([
      // For now, grab all products from the API and set the current product as the 1st one (40344)
      ProductOverview.getProductList(),
      // For now, grab product details only for the 1st product
      ProductOverview.getProductStyles(40370),
      ProductOverview.getProductReviews(40370),
      ProductOverview.getProductRatings(40370),
    ])
      .then((results) => {
        // console.log(results);
        this.setState({
          product: results[0].data[0],
          productStyles: results[1].data,
          productReviews: results[2].data,
          productRatings: results[3].data,
          productStyleSelected: results[1].data.results[0],
          isFetching: false,
        });
      })
      .catch((error) => { throw new Error(`Error in fetching from server: ${error.message}`); });
  }

  static getProductList() {
    return axios.get('/products')
      .catch((error) => { throw new Error(`Error in getting product list from server: ${error.message}`); });
  }

  static getProductStyles(productID) {
    return axios.get(`/products/${productID}/styles`)
      .catch((error) => { throw new Error(`Error in getting product styles from server: ${error.message}`); });
  }

  static getProductReviews(productID) {
    return axios.get(`/reviews/?product_id=${productID}`)
      .catch((error) => { throw new Error(`Error in getting product reviews from server: ${error.message}`); });
  }

  static getProductRatings(productID) {
    return axios.get(`/reviews/meta/?product_id=${productID}`)
      .catch((error) => { throw new Error(`Error in getting product ratings from server: ${error.message}`); });
  }

  selectProductStyle(style) {
    const { productStyleSelected } = this.state;
    if (style.style_id !== productStyleSelected.style_id) {
      this.setState({ productStyleSelected: style });
    }
  }

  render() {
    const {
      isFetching,
      expanded,
      product,
      productStyles,
      productReviews,
      productRatings,
      productStyleSelected,
    } = this.state;

    if (isFetching) {
      return null;
    }

    // Placeholder for 'expanded view'
    if (expanded === true) {
      return (
        <div>
          <ImageGallery productStyles={productStyles} />
        </div>
      );
    }

    return (
      <div id="product-main-container">
        <div id="product-upper-container">
          <ImageGallery productStyleSelected={productStyleSelected} />
          <div id="product-right-container">
            <ProductInformation
              product={product}
              productReviews={productReviews}
              productRatings={productRatings}
              productStyleSelected={productStyleSelected}
            />
            <StyleSelector
              productStyles={productStyles}
              productStyleSelected={productStyleSelected}
              selectProductStyle={this.selectProductStyle}
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

export default ProductOverview;
