import React from 'react';
import PropTypes from 'prop-types';
import ProductDetail from './ProductDetail/ProductDetail';
import RelatedItemsAndOutfit from './RelatedItemsAndOutfit/RelatedItemsAndOutfit';
import QuestionsAndAnswers from './QuestionsAndAnswers/QuestionsAndAnswers';
import RatingsAndReviews from './RatingsAndReviews/RatingsAndReviews';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    return (
      <div className="app-container">
        <div>`TitleBar`</div>
        <ProductDetail />
        <RelatedItemsAndOutfit />
        <QuestionsAndAnswers />
        <RatingsAndReviews />
      </div>
    );
  }
}

export default App;

App.propTypes = {
  sampleProp: PropTypes.isInstanceOf(Array).isRequired,

};
