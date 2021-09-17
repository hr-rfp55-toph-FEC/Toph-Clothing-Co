import React from 'react';
import PropTypes from 'prop-types';

const ComparisonModal = ({closeModalHandler, ModalClass}) => (
  <div className={ModalClass}>
    <div className="comp-modal-content">
      <button type="button" onClick={closeModalHandler} className="comp-close-modal">&times;</button>
      <h1>Hello, I am modal</h1>
    </div>
  </div>
);
export default ComparisonModal;

ComparisonModal.propTypes = {
  closeModalHandler: PropTypes.instanceOf(Object).isRequired,
  ModalClass: PropTypes.string.isRequired,
};
