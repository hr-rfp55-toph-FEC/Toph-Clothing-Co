import React from 'react';

class ProductDetail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };
  }

  render() {
    const { expanded } = this.state;

    if (expanded === true) {
      return (
        <div>
          ProductDetail
          <ImageGallery />
        </div>
      );
    }

    return (
      <div>
        ProductDetail
        <ImageGallery />
        <ProductInformation />
        <StyleSelector />
        <AddToCard />
      </div>
    );
  }
}

export default ProductDetail;
