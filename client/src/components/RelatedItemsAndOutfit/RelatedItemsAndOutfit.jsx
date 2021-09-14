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
      relatedProdsInfo: [],
      relatedProdStyles: [],
    };
  }

  componentDidMount() {
    const currProdId = '40344';
    //hard code in a currentProdId for now
    this.getRelatedProductsInfo(currProdId);
    this.getRelatedProductStyles(currProdId);
    //and info about userOutfit
  }

  getProductInfo(prodId) {
    return this.api.get(`/products/${prodId}`)
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  getRelatedProductIds(currProdId) {
    return this.api.get(`/products/${currProdId}/related`)
      .catch((err) => console.log(err));
  }

  getProductStyles(currProdId) {
    return this.api.get(`/products/${currProdId}/styles`)
      .then((data) => data)
      .catch((err) => console.log(err));
  }

  getRelatedProductsInfo(currProdId) {
    this.getRelatedProductIds(currProdId)
      .then((relatedIds) => relatedIds.data.map((id) => this.getProductInfo(id)))
      .then((relatedProdsInfoPromises) => Promise.all(relatedProdsInfoPromises))
      .then((response) => response.map((res) => res.data))
      .then((relProdsInfo) => this.setState({ relatedProdsInfo: relProdsInfo }))
      .catch((err) => console.log(err));
  }

  getRelatedProductStyles(currProdId) {
    this.getRelatedProductIds(currProdId)
      .then((relatedIds) => relatedIds.data.map((id) => this.getProductStyles(id)))
      .then((relatedStylesPromises) => Promise.all(relatedStylesPromises))
      .then((response) => response.map((res) => res.data))
      .then((relProdStyles) => this.setState({ relatedProdStyles: relProdStyles }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="related-lists">
        <div className="related-product-list-container">
          <RelatedProducts
            ProdsInfo={this.state.relatedProdsInfo}
            ProdStyles={this.state.relatedProdStyles}
          />
        </div>
        <div className="outfit-list-container">
          <UserOutfit />
        </div>
      </div>
    );
  }
}

// RelatedItemsAndOutfit.propTypes = {
//   relatedProdsInfo: PropTypes.array
// };

export default RelatedItemsAndOutfit;
