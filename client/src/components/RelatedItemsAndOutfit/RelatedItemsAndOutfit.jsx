import React from 'react';
import axios from 'axios';
import server from './Axios';
import RelatedProducts from './RelatedProducts/RelatedProducts';
import UserOutfit from './UserOutfits/UserOutfit';

class RelatedItemsAndOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.server = server;
    this.state = {
      prodsInfo: [],
      prodsStyles: [],
      prodsMeta: [],
      isFetching: true,
    };
  }

  componentDidMount() {
    const currProdId = '40344';
    this.getRelatedData(currProdId);
  }

  getRelatedData(currProdId) {
    this.server.get(`/related/${currProdId}`)
      .then((res) => this.setState({
        prodsInfo: res.data[0],
        prodsStyles: res.data[1],
        prodsMeta: res.data[2],
        isFetching: false,
      }))
      .catch((err) => console.log(err));
  }

  render() {
    const { isFetching } = this.state;
    return (
      <div>
        {isFetching ? (
          <div>Loading...</div>
        )
          : (
            <div className="related-lists">
              <div className="related-product-list-container">
                <RelatedProducts
                  prodsInfo={this.state.prodsInfo}
                  prodsStyles={this.state.prodsStyles}
                  prodsMeta={this.state.prodsMeta}
                />
              </div>
              <div className="outfit-list-container">
                {/* <UserOutfit
            prodsInfo={this.state.prodsInfo}
            prodsStyles={this.state.prodsStyles}
            prodsMeta={this.state.prodsMeta}
          /> */}
              </div>
            </div>
          )}

      </div>
    );
  }
}

// RelatedItemsAndOutfit.propTypes = {
//   relatedProdsInfo: PropTypes.array
// };

export default RelatedItemsAndOutfit;
