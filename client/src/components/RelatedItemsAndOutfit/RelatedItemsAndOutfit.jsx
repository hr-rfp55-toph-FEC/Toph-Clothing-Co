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
      timeout: 5000,
      headers: {
        Authorization: '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',
      },
    });
    this.state = {
      relatedProds: [],
    };
  }

  componentDidMount() {
    const currProdId = '40344';
    //hard code in a currentProdId for now
    this.getRelatedProducts(currProdId);
    //and info about userOutfit
  };

  getProductInfo(prodId) {
    return this.api.get(`/products/${prodId}`)
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  getRelatedProducts(currProdId) {
    this.api.get(`/products/${currProdId}/related`)
      .then((relatedIds) => relatedIds.data.map((id) => this.getProductInfo(id)))
      .then((relatedProdsPromise) => Promise.all(relatedProdsPromise))
      .then((response) => response.map((res) => res.data))
      .then((relProds) => this.setState({ relatedProds: relProds }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="related-lists">
        <div className="related-product-list-container">
          <RelatedProducts relatedProds={this.state.relatedProds}/>
        </div>
        <div className="outfit-list-container">
          <UserOutfit />
        </div>
      </div>
    );
  }
}

export default RelatedItemsAndOutfit;
