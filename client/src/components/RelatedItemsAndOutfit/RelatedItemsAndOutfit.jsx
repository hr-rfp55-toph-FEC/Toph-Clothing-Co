import React from 'react';
import server from './Axios';
import axios from 'axios';
import RelatedProducts from './RelatedProducts';
import UserOutfit from './UserOutfit';

class RelatedItemsAndOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.server = server;
    this.state = {
      relProdsInfo: [],
      relProdsStyles: [],
      relProdsMeta: [],
    };
  }

  componentDidMount() {
    const currProdId = '40344';
    this.getRelatedData(currProdId);
  }

  getRelatedData(currProdId) {
    this.server.get(`/related/${currProdId}`)
      .then((res) => this.setState({
        relProdsInfo: res.data[0],
        relProdsStyles: res.data[1],
        relProdsMeta: res.data[2]
      }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div className="related-lists">
        <div className="related-product-list-container">
          <RelatedProducts
            prodsInfo={this.state.relProdsInfo}
            prodsStyles={this.state.relProdsStyles}
            prodsMeta={this.state.relProdsMeta}
          />
        </div>
        <div className="outfit-list-container">
          <UserOutfit
            prodsInfo={this.state.relProdsInfo}
            prodsStyles={this.state.relProdsStyles}
            prodsMeta={this.state.relProdsMeta}
          />
        </div>
      </div>
    );
  }
}

// RelatedItemsAndOutfit.propTypes = {
//   relatedProdsInfo: PropTypes.array
// };

export default RelatedItemsAndOutfit;
