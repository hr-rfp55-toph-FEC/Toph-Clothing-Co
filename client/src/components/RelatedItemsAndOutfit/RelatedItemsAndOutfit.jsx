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
      relatedProdsInfo: [],
      relatedProdStyles: [],
    };
  }

  componentDidMount() {
    const currProdId = '40344';
    server.get(`/related/${currProdId}`)
      .then((data) => console.log(data))
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
