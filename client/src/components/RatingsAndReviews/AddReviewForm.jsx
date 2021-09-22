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
      recommend: false,
      characteristics: {},
      summary: '',
      body: '',
      name: '',
      email: '',
    };

    this.processCharacteristics = this.processCharacteristics.bind(this);
    this.handleStarRatingClick = this.handleStarRatingClick.bind(this);
    this.handleCharRatingClick = this.handleCharRatingClick.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    // this.handleReviewSummaryChange = this.handleReviewSummaryChange.bind(this);
    // this.handleReviewBodyChange = this.handleReviewBodyChange.bind(this);
    // this.handleReviewerNicknameChange = this.handleReviewerNicknameChange.bind(this);
    // this.handleReviewerEmailChange = this.handleReviewerEmailChange.bind(this);
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

  handleInputChange(e) {
    const { name } = e.target;
    this.setState({ [name]: e.target.value });
  }

  // handleReviewSummaryChange(e) {
  //   this.setState({ summary: e.target.value });
  // }

  // handleReviewBodyChange(e) {
  //   this.setState({ body: e.target.value });
  // }

  // handleReviewerNicknameChange(e) {
  //   this.setState({ name: e.target.value });
  // }

  // handleReviewerEmailChange(e) {
  //   this.setState({ email: e.target.value });
  // }

  processCharacteristics() {
    const { characteristics } = this.props;
    const chars = Object.entries(characteristics);
    chars.forEach((char) => {
      if (char[0] === 'Size') {
        char[1].labels = ['A size too small', '1/2 a size too small', 'Perfect', '1/2 a size too big', 'A size too wide'];
      } else if (char[0] === 'Width') {
        char[1].labels = ['Too narrow', 'Slightly narrow', 'Perfect', 'Slightly wide', 'Too wide'];
      } else if (char[0] === 'Comfort') {
        char[1].labels = ['Uncomfortable', 'Slightly uncomfortable', 'Ok', 'Comfortable', 'Perfect'];
      } else if (char[0] === 'Quality') {
        char[1].labels = ['Poor', 'Below average', 'What I expected', 'Pretty great', 'Perfect'];
      } else if (char[0] === 'Length') {
        char[1].labels = ['Runs Short', 'Runs slightly short', 'Perfect', 'Runs slightly long', 'Runs long'];
      } else if (char[0] === 'Fit') {
        char[1].labels = ['Runs tight', 'Runs slightly tight', 'Perfect', 'Runs slightly long', 'Runs long'];
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
      innerWidth, showStarLabel, rating, chars, body,
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

    let reviewBodyCounter;
    if (body.length < 50) {
      reviewBodyCounter = (
        <div className="review-body-counter">
          Minimum required characters left:
          {' '}
          {50 - body.length}
        </div>
      );
    } else {
      reviewBodyCounter = (
        <div className="review-body-counter">
          Minimum reached.
        </div>
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
                  <input
                    type="radio"
                    name="recommend"
                    id="recommend"
                    value="true"
                    onChange={this.handleInputChange}
                    required="required"
                  />
                  Yes
                </label>
                <label htmlFor="not-recommend">
                  <input
                    type="radio"
                    name="recommend"
                    id="not-recommend"
                    value="false"
                    onChange={this.handleInputChange}
                    required="required"
                  />
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
            <div className="user-review-summary">
              <label htmlFor="user-review-summary">
                Review Summary
                <br />
                <input
                  type="text"
                  id="user-review-summary"
                  name="summary"
                  maxLength="60"
                  size="60"
                  onChange={this.handleInputChange}
                />
              </label>
            </div>
            <div className="user-review-body">
              <label htmlFor="user-review-body">
                Please write your review here:
                <br />
                <textarea
                  id="user-review-body"
                  name="body"
                  required="required"
                  rows="20"
                  cols="50"
                  placeholder="Why did you like the product or not?"
                  minLength="50"
                  maxLength="1000"
                  onChange={this.handleInputChange}
                />
              </label>
              {reviewBodyCounter}
            </div>
            <div className="upload-review-photo">
              <label htmlFor="upload-review-photo">
                Please upload your photos here:
                <br />
                <input
                  type="file"
                  id="upload-review-photo"
                  name="new-review-photo"
                  accept="image/png, image/jpeg"
                />
              </label>
              <span>
                <button type="button">Upload</button>
              </span>
            </div>
            <div className="review-user-nickname">
              <label htmlFor="review-user-nickname">
                What is your nickname?
                <br />
                <input
                  type="text"
                  id="review-user-nickname"
                  name="name"
                  required="required"
                  maxLength="60"
                  size="20"
                  placeholder="Example: jackson11!"
                  onChange={this.handleInputChange}
                />
              </label>
              <div id="reviewname-privacy-warning">
                For privacy reasons, do not use your full name or email address
              </div>
            </div>
            <div className="review-user-email">
              <label htmlFor="review-user-email">
                What is your email?
                <br />
                <input
                  type="email"
                  id="review-user-email"
                  name="email"
                  required="required"
                  maxLength="60"
                  size="30"
                  placeholder="Example: jackson11@email.com"
                  onChange={this.handleInputChange}
                />
              </label>
              <div id="reviewemail-privacy-warning">
                For authentication reasons, you will not be emailed
              </div>
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