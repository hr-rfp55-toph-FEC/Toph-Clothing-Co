import React from 'react';
import server from './Axios';
import RelatedProducts from './RelatedProducts/RelatedProducts';
import UserOutfit from './UserOutfits/UserOutfit';

class RelatedItemsAndOutfit extends React.Component {
  constructor(props) {
    super(props);
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
    server.get(`/related/${currProdId}`)
      .then((res) => this.setState({
        prodsInfo: res.data[0],
        prodsStyles: res.data[1],
        prodsMeta: res.data[2],
        isFetching: false,
      }))
      .catch((err) => console.log(err));
  }

  render() {
    const {
      isFetching, prodsInfo, prodsMeta, prodsStyles,
    } = this.state;
    return (
      <div>
        {isFetching ? (
          <div>Loading...</div>
        )
          : (
            <div className="related-lists">
              <RelatedProducts
                prodsInfo={prodsInfo}
                prodsStyles={prodsStyles}
                prodsMeta={prodsMeta}
              />
              <UserOutfit
                prodsInfo={prodsInfo}
                prodsStyles={prodsStyles}
                prodsMeta={prodsMeta}
              />
            </div>
          )}

      </div>
    );
  }
}

export default RelatedItemsAndOutfit;
