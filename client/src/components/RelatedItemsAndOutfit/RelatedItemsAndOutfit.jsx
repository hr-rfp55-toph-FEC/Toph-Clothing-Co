import React from 'react';
import RelatedProducts from './RelatedProducts';
import UserOutfit from './UserOutfit';

class RelatedItemsAndOutfit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className="related-lists">
        <div className="related-product-list-container">
          <RelatedProducts />
        </div>
        <div className="outfit-list-container">
          <UserOutfit />
        </div>
      </div>
    );
  }
}

export default RelatedItemsAndOutfit;
