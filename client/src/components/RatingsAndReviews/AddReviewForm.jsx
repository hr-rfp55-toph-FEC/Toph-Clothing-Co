/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import AddCharacteristic from './AddCharacteristic';

const AddReviewForm = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chars: [],
      showStarLabel: false,
      innerWidth: '0%',
      rating: 0,
      recommendProduct: false,
      characteristics: {},
    };

    this.processCharacteristics = this.processCharacteristics.bind(this);
    this.handleStarRatingClick = this.handleStarRatingClick.bind(this);
    this.handleCharRatingClick = this.handleCharRatingClick.bind(this);
  }

  componentDidMount() {
    this.processCharacteristics();
  }

  componentDidUpdate(prevProps) {
    const { characteristics } = this.props;
    if (JSON.stringify(characteristics) !== JSON.stringify(prevProps.characteristics)) {
      this.processCharacteristics();
    }
  }

  handleStarRatingClick(id) {
    this.setState({
      innerWidth: String(id * 20).concat('%'),
      showStarLabel: true,
      rating: id,
    });
  }

  handleCharRatingClick(id, e) {
    const { characteristics } = this.state;
    const selection = { ...characteristics };
    selection[id] = e.target.value;
    this.setState({
      characteristics: selection,
    });
    // console.log(e.target.value);
    // console.log(e.target.name);
  }

  processCharacteristics() {
    const { characteristics } = this.props;
    const chars = Object.entries(characteristics);
    chars.forEach((char) => {
      if (char[0] === 'Size') {
        char[1].scale = ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide'];
      } else if (char[0] === 'Width') {
        char[1].scale = ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'];
      } else if (char[0] === 'Comfort') {
        char[1].scale = ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'];
      } else if (char[0] === 'Quality') {
        char[1].scale = ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'];
      } else if (char[0] === 'Length') {
        char[1].scale = ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'];
      } else if (char[0] === 'Fit') {
        char[1].scale = ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'];
      }
      return char;
    });
    this.setState({ chars });
  }

  render() {
    const {
      productInfo, showAddReviewModal, closeReviewFormHandler,
    } = this.props;

    const {
      innerWidth, showStarLabel, rating, chars,
    } = this.state;

    const starIds = [1, 2, 3, 4, 5];
    const labels = {
      1: 'Poor', 2: 'Fair', 3: 'Average', 4: 'Good', 5: 'Great',
    };

    let reviewFormClass = 'review-form-container';

    if (showAddReviewModal) {
      reviewFormClass = 'review-form-container show-review-form';
    }

    const innerStarStyle = {
      width: innerWidth,
    };

    let starLabel;
    if (showStarLabel) {
      starLabel = (
        <span className="new-review-stars-label">
          {rating === 1 ? `${rating} star` : `${rating} stars`}
          {' - '}
          {labels[rating]}
        </span>
      );
    }

    return (
      <div className={reviewFormClass}>
        <div className="review-form-content">
          <span className="close-modal" onClick={closeReviewFormHandler} role="presentation"><i className="fas fa-times" /></span>
          <h1 className="review-form-title">Write Your Review</h1>
          <h2>
            About the
            {' '}
            {productInfo.name}
          </h2>
          <form id="add-review-form">
            <label>
              Overall rating*:
              <div>
                <div className="stars-outer new-review-stars">
                  {starIds.map((id) => (
                    <i
                      className="far fa-star"
                      key={id}
                      onClick={() => this.handleStarRatingClick(id)}
                      role="presentation"
                    />
                  ))}
                  <div className="stars-inner new-review-stars" style={innerStarStyle}>
                    {starIds.map((id) => (
                      <i
                        className="fas fa-star"
                        key={id}
                        onClick={() => this.handleStarRatingClick(id)}
                        role="presentation"
                      />
                    ))}
                  </div>
                </div>
                {starLabel}
              </div>
            </label>
            <div id="recommend-product">
              <label>
                Do you recommend this product?*
                <label htmlFor="recommend">
                  <input type="radio" name="recommendation" id="recommend" value="true" onClick={() => this.setState({ recommendProduct: true })} />
                  Yes
                </label>
                <label htmlFor="not-recommend">
                  <input type="radio" name="recommendation" id="not-recommend" value="false" onClick={() => this.setState({ recommendProduct: false })} />
                  No
                </label>
              </label>
            </div>
            <div id="add-characteristic-container">
              {chars.map((char) => (
                <AddCharacteristic
                  char={char}
                  key={char[1].id}
                  handleCharRatingClick={this.handleCharRatingClick}
                />
              ))}
            </div>
          </form>
        </div>
      </div>
    );
  }
};

AddReviewForm.propTypes = {
  productInfo: PropTypes.instanceOf(Object).isRequired,
  characteristics: PropTypes.instanceOf(Object).isRequired,
  showAddReviewModal: PropTypes.bool.isRequired,
  closeReviewFormHandler: PropTypes.instanceOf(Function).isRequired,
};

export default AddReviewForm;

// const handleStarHover = (id) => {
//   // console.log('mouse over');
//   setInnerWidth(String(id * 20).concat('%'));
// };

// const handleMouseLeave = () => {
//   // console.log('mouse left');
//   // event.target.style.width = '0%';
//   // setInnerWidth('0%');
// };

// onMouseEnter={() => handleStarHover(id)}
// onMouseLeave={() => handleMouseLeave()}