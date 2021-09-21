import React from 'react';
import server from '../helpers/Axios';
import RelatedProducts from './RelatedProducts/RelatedProducts';
import UserOutfit from './UserOutfits/UserOutfit';

class RelatedItemsAndOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currProdId: '40344',
      currProd: [],
      prodsInfo: [],
      prodsStyles: [],
      prodsMeta: [],
      isFetching: true,
    };
    this.onRelatedCardClick = this.onRelatedCardClick.bind(this);
  }

  componentDidMount() {
    const { currProdId } = this.state;
    this.getCurrProdData(currProdId);
    this.getRelatedData(currProdId);
  }

  componentDidUpdate(prevProps, prevState) {
    const { currProdId } = this.state;
    if (prevState.currProdId !== currProdId) {
      this.getCurrProdData(currProdId);
      this.getRelatedData(currProdId);
    }
  }

  onRelatedCardClick(productId) {
    // console.log(productId);
    this.setState({
      currProdId: productId,
    });
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

  getCurrProdData(currProdId) {
    server.get(`/currentProduct/${currProdId}`)
      .then((res) => this.setState({
        currProd: res.data,
      }))
      .catch((err) => console.log(err));
  }

  render() {
    const {
      isFetching, prodsInfo, prodsMeta, prodsStyles, currProd,
    } = this.state;
    return (
      <div>
        {isFetching ? (
          <div>Loading...</div>
        )
          : (
            <div className="related-lists">
              <RelatedProducts
                onRelatedCardClick={this.onRelatedCardClick}
                currProd={currProd}
                prodsInfo={prodsInfo}
                prodsStyles={prodsStyles}
                prodsMeta={prodsMeta}
              />
              <UserOutfit
                onRelatedCardClick={this.onRelatedCardClick}
                currProd={currProd}
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
