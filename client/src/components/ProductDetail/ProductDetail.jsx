import React from 'react';
import axios from 'axios';

import ImageGallery from './ImageGallery';
import ProductInformation from './ProductInformation';
import StyleSelector from './StyleSelector';
import AddToCart from './AddToCart';
import OverviewAndShare from './OverviewAndShare';

import config from '../../../../config';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      product: {},
      productStyles: {},
      // product: {
      //   id: 40344,
      //   campus: 'hr-rfp',
      //   name: 'Camo Onesie',
      //   slogan: 'Blend in to your crowd',
      //   description: 'The So Fatigues will wake you up and fit you in.
      // This high energy camo will have you blending in to even the wildest surroundings.',
      //   category: 'Jackets',
      //   default_price: '140.00',
      //   created_at: '2021-08-13T14:38:44.509Z',
      //   updated_at: '2021-08-13T14:38:44.509Z',
      // },
      expanded: false,
    };
  }

  componentDidMount() {
    this.getProductList();
    this.getProductInformation();
  }

  getProductList() {
    const options = {
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products',
      headers: {
        Authorization: config.TOKEN,
      },
    };
    axios(options)
      .then((result) => {
        console.log(result.data);
        this.setState({
          product: result.data[0],
        });
      })
      .catch((error) => {
        throw new Error(error.message);
        // console.log('Error in getting all products', error);
      });
  }

  getProductInformation() {
    // const { product } = this.state;

    const options = {
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/products/40344/styles',
      headers: {
        Authorization: config.TOKEN,
      },
    };
    axios(options)
      .then((result) => {
        this.setState({
          productStyles: result.data.results[0],
        });
      })
      .catch((error) => {
        throw new Error(error.message);
        // console.log('Error in getting all products', error);
      });
  }

  render() {
    const { expanded, product, productStyles } = this.state;

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
            <ProductInformation product={product} />
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
