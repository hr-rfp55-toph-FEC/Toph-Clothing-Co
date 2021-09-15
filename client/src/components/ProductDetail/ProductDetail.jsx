import React from 'react';
import Stars from '../Stars';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div>
        ProductDetail
        <Stars rating={3.7230498230436345} />
      </div>
    );
  }
}

export default ProductDetail;
