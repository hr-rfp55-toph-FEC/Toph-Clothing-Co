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
      prodInfo: {},
      prodStyles: {},
      prodStyleSelected: {},
      prodReviewsMeta: {},
      prodReviews: {},
      isFetching: true,
    };
    this.changeProductHandler = this.changeProductHandler.bind(this);
    this.getCurrProdData = this.getCurrProdData.bind(this);
    this.selectProductStyle = this.selectProductStyle.bind(this);
  }

  componentDidMount() {
    const { currProdId } = this.state;
    this.getCurrProdData(currProdId);
  }

  getCurrProdData(currProdId) {
    // console.log('here');
    server.get(`/currentProduct/${currProdId}`)
      .then(({ data }) => this.setState({
        currProdId: data[0].id,
        prodInfo: data[0],
        prodStyles: data[1],
        prodStyleSelected: data[1].results[0],
        prodReviewsMeta: data[2],
        prodReviews: data[3],
        isFetching: false,
      }))
      .catch((err) => console.log(err, 'too many API calls!'));
  }

  changeProductHandler(productId) {
    const { currProdId } = this.state;
    if (productId !== currProdId) {
      this.getCurrProdData(productId);
    }
  }

  selectProductStyle(style) {
    const { prodStyleSelected } = this.state;
    if (style.style_id !== prodStyleSelected.style_id) {
      this.setState({ prodStyleSelected: style });
    }
  }

  render() {
    const {
      currProdId, prodInfo, prodStyles, prodReviewsMeta, prodReviews, isFetching, prodStyleSelected,
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
                product={prodInfo}
                productStyles={prodStyles}
                productStyleSelected={prodStyleSelected}
                productReviews={prodReviews}
                productRatings={prodReviewsMeta}
                selectProductStyle={this.selectProductStyle}
              />
              <RelatedItemsAndOutfit
                currProdId={currProdId}
                prodInfo={prodInfo}
                prodStyles={prodStyles}
                prodReviewsMeta={prodReviewsMeta}
                prodStyleSelected={prodStyleSelected}
                changeProductHandler={this.changeProductHandler}
              />
              <RatingsAndReviews
                prodInfo={prodInfo}
                prodReviews={prodReviews}
                prodReviewsMeta={prodReviewsMeta}
                getCurrProdData={this.getCurrProdData}
              />
            </div>
          )}
      </div>
    );
  }
}

export default App;
