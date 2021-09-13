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
        'User-Agent': 'request',
        Authorization: config.TOKEN,
      },
      params: {
        product_id: 40344,
      },
    };
    axios(options)
      .then((response) => {
        // console.log(response.data);
        this.setState({ reviews: response.data.results });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="reviews-list">
        {this.state.reviews.map((review) => <ReviewTile review={review} />)}
      </div>
    );
  }
};

export default ReviewsList;
