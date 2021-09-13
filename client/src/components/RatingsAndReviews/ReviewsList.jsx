import React from 'react';
import axios from 'axios';
import ReviewTile from './ReviewTile';
import config from '../../config/config';

const ReviewsList = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      reviews: [],
    };

    this.getReviews = this.getReviews.bind(this);
  }

  componentDidMount() {
    this.getReviews();
  }

  getReviews() {
    const options = {
      url: 'reviews/',
      method: 'get',
      baseURL: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfp/',
      headers: {
        Authorization: config.TOKEN,
      },
      params: {
        product_id: 40348,
      },
    };
    axios(options)
      .then((response) => {
        this.setState({ reviews: response.data.results });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="reviews-list">
        <h3>{this.state.reviews.length}
          reviews, sorted by
        </h3>
        {this.state.reviews.map((review) => <ReviewTile review={review} key={review.review_id} />)}
      </div>
    );
  }
};

export default ReviewsList;
