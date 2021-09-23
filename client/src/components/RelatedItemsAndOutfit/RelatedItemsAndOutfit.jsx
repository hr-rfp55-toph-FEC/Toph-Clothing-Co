import React from 'react';
import PropTypes from 'prop-types';
import server from '../helpers/Axios';
import RelatedProducts from './RelatedProducts/RelatedProducts';
import UserOutfit from './UserOutfits/UserOutfit';

class RelatedItemsAndOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currProd: [],
      prodsInfo: [],
      prodsStyles: [],
      prodsMeta: [],
      isFetching: true,
    };
  }

  componentDidMount() {
    this.setCurrProdToState();
  }

  componentDidUpdate(prevProps) {
    const {
      currProdId,
    } = this.props;
    /* console.log('doesnt fire request on "update" --
    why is the method reaching here on initial page load?'); */
    if ((prevProps.currProdId !== currProdId)) {
      this.setCurrProdToState(currProdId);
      // console.log('it ran once per click!');
    }
  }

  setCurrProdToState() {
    const {
      currProdId, prodInfo, prodStyles, prodReviewsMeta,
    } = this.props;
    this.setState({ currProd: [prodInfo, prodStyles, prodReviewsMeta] },
      this.getRelatedData(currProdId));
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
      isFetching, prodsInfo, prodsMeta, prodsStyles, currProd,
    } = this.state;
    const { prodStyleSelected } = this.props;
    // console.log(prodStyleSelected, 'realted outfit and items');
    const { changeProductHandler } = this.props;
    return (
      <div>
        {isFetching ? (
          <div>Loading...</div>
        )
          : (
            <div className="related-lists">
              <RelatedProducts
                changeProductHandler={changeProductHandler}
                currProd={currProd}
                prodsInfo={prodsInfo}
                prodsStyles={prodsStyles}
                prodsMeta={prodsMeta}
              />
              <UserOutfit
                changeProductHandler={changeProductHandler}
                currProd={currProd}
                prodStyleSelected={prodStyleSelected}
              />
            </div>
          )}

      </div>
    );
  }
}

RelatedItemsAndOutfit.propTypes = {
  currProdId: PropTypes.number.isRequired,
  prodInfo: PropTypes.instanceOf(Object).isRequired,
  prodStyles: PropTypes.instanceOf(Object).isRequired,
  prodReviewsMeta: PropTypes.instanceOf(Object).isRequired,
  changeProductHandler: PropTypes.func.isRequired,
};

export default RelatedItemsAndOutfit;
