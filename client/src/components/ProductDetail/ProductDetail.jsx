import React from 'react';
import axios from 'axios';

import ImageGallery from './ImageGallery';
import ProductInformation from './ProductInformation';
import StyleSelector from './StyleSelector';
import AddToCart from './AddToCart';
import OverviewAndShare from './OverviewAndShare';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      productStyles: {},
      productReviews: {},
      productRatings: {},
      productStarRatings: 3.7,
      expanded: false,
    };
  }

  componentDidMount() {
    this.getProductList();
    this.getProductStyles(40344);
    this.getProductReviews(40344);
    this.getProductRatings(40344);
  }

  getProductList() {
    axios.get('/products')
      .then((result) => {
        // console.log(result.data);
        this.setState({
          product: result.data[0],
        });
      })
      .catch((error) => { throw new Error(`Error in getting product list from server: ${error.message}`); });
  }

  getProductStyles(productID) {
    axios.get(`/products/${productID}/styles`)
      .then((result) => {
        // console.log(result.data);
        this.setState({
          productStyles: result.data,
        });
      })
      .catch((error) => { throw new Error(`Error in getting product styles from server: ${error.message}`); });
  }

  getProductReviews(productID) {
    axios.get(`/reviews/?product_id=${productID}`)
      .then((result) => {
        // console.log(result.data);
        this.setState({
          productReviews: result.data,
        });
      })
      .catch((error) => { throw new Error(`Error in getting product reviews from server: ${error.message}`); });
  }

  getProductRatings(productID) {
    axios.get(`/reviews/meta/?product_id=${productID}`)
      .then((result) => {
        console.log(result.data);
        this.setState({
          productRatings: result.data,
        });
      })
      .catch((error) => { throw new Error(`Error in getting product reviews from server: ${error.message}`); });
  }

  render() {
    const {
      expanded,
      product,
      productStyles,
      productReviews,
      productRatings,
    } = this.state;

    if (expanded === true) {
      return (
        <div>
          ProductDetail
          <ImageGallery productStyles={productStyles} />
        </div>
      );
    }

    return (
      <div id="product-main-container">
        <div id="product-upper-container">
          <ImageGallery productStyles={productStyles} />
          <div id="product-right-container">
            <ProductInformation
              product={product}
              productReviews={productReviews}
              productRatings={productRatings}
            />
            <StyleSelector />
            <AddToCart />
          </div>
        </div>
        <OverviewAndShare product={product} />
      </div>
    );
  }
}

export default ProductDetail;
