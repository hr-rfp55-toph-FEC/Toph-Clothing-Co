import React from 'react';
import server from './helpers/Axios';
import Banner from './Banner';
import ProductOverview from './ProductOverview/ProductOverview';
import RelatedItemsAndOutfit from './RelatedItemsAndOutfit/RelatedItemsAndOutfit';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currProdId: '40344',
      prodInfo: [],
      prodStyles: [],
      prodReviewsMeta: [],
      prodReviews: [],
      isFetching: true,
    };
    this.changeProductHandler = this.changeProductHandler.bind(this);
  }

  componentDidMount() {
    const { currProdId } = this.state;
    this.getCurrProdData(currProdId);
  }

  getCurrProdData(currProdId) {
    server.get(`/currentProduct/${currProdId}`)
      .then(({ data }) => this.setState({
        currProdId: data[0].id,
        prodInfo: data[0],
        prodStyles: data[1],
        prodReviewsMeta: data[2],
        prodReviews: data[3],
        isFetching: false,
      }))
      .catch((err) => console.log(err));
  }

  changeProductHandler(productId) {
    const { currProdId } = this.state;
    if (productId !== currProdId) {
      this.setState({
        isFetching: true,
      });
      this.getCurrProdData(productId);
    }
  }

  render() {
    const {
      prodInfo, prodStyles, prodReviewsMeta, prodReviews, isFetching,
    } = this.state;

    return (
      <div>
        {isFetching ? (
          <div>Loading...</div>
        )
          : (
            <div className="app-container">
              <Banner changeProductHandler={this.changeProductHandler} />
              <ProductOverview
                prodInfo={prodInfo}
                prodStyles={prodStyles}
                prodReviewsMeta={prodReviewsMeta}
              />
              <RelatedItemsAndOutfit
                prodInfo={prodInfo}
                prodStyles={prodStyles}
                prodReviewsMeta={prodReviewsMeta}
                changeProductHandler={this.changeProductHandler}
              />
              <RatingsAndReviews
                prodInfo={prodInfo}
                prodReviews={prodReviews}
                prodReviewsMeta={prodReviewsMeta}
              />
            </div>
          )}
      </div>
    );
  }
}

export default App;
