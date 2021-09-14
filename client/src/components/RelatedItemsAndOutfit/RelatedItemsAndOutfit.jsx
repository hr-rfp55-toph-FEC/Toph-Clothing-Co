import React from 'react';
// import api from './Axios';
import axios from 'axios';
import RelatedProducts from './RelatedProducts';
import UserOutfit from './UserOutfit';

class RelatedItemsAndOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.api = axios.create({
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp',
      timeout: 3000,
      headers: {
        Authorization: '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',
      },
    });
    this.state = {

    };
  }

  componentDidMount() {
    const currProdId = '40344';
    this.getRelatedProducts(currProdId);

    //and info about userOutfit
  };

  getRelatedProducts(currProdId) {
    this.api.get(`/products/${currProdId}/related`, {
    })
      .then((relatedIds) => {
        console.log(relatedIds.data);
        //upon mount I need info about related products -> related Id's returned
      });
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
