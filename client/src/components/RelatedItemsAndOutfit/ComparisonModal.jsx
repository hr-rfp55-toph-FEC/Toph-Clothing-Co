import React from 'react';
import PropTypes from 'prop-types';

const ComparisonModal = ({ closeModalHandler, ModalClass }) => (
  <div className={ModalClass}>
    <div className="comp-modal-content">
      <button type="button" onClick={closeModalHandler} className="comp-close-modal">&times;</button>
      <h1 className="comp-modal-header">Comparing</h1>
      <div className="table-wrapper">
        <div className="flex-current-prod comp-flex">
          <div>Current Product Name</div>
          <div>Check</div>
        </div>
        <div className="comp-flex">
          <div>Nothing Here</div>
          <div>Made of Woolly Mammoth</div>
        </div>
        <div className="flex-compare-prod comp-flex">
          <div>Compare Product Name</div>
          <div>Check</div>
        </div>
      </div>
    </div>
  </div>
);
export default ComparisonModal;

ComparisonModal.propTypes = {
  closeModalHandler: PropTypes.instanceOf(Object).isRequired,
  ModalClass: PropTypes.string.isRequired,
};

/*
<table className="char-table">
<tr className="char-table-headers">
  <th>Current Product Name</th>
  <th>.</th>
  <th>Country</th>
</tr>
<tr>
  <td>check</td>
  <td>Characteristic</td>
  <td>check</td>
</tr>
<tr>
  <td>no check</td>
  <td>Characteristic</td>
  <td>check</td>
</tr>
</table>
*/