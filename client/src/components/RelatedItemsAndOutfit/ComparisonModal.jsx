import React, { useState } from 'react';
import PropTypes from 'prop-types';

const ComparisonModal = ({ closeModalHandler, modalClass, currProd, modalRelProd }) => {
  const [characteristics, setCharacteristics] = useState([1, 2, 3]);
  const [orderNumber, setOrderNumber] = useState(0);
  console.log(currProd, modalRelProd);
  const rowItemDiv = (prodChar, orderNumber) => <div style={{ order: `${orderNumber}` }} className="comp-table-cell"><h3>{prodChar}</h3></div>;
  const characteristicList = (char, orderNumber) => <div style={{ order: `${orderNumber}` }} className="comp-table-cell"><h3>{char}</h3></div>;

  return (
    <div className={modalClass}>
      <div className="comp-modal-content">
        <button type="button" onClick={closeModalHandler} className="comp-close-modal">&times;</button>
        <h1 className="comp-modal-header">Comparing</h1>
        <div className="comp-table comp-table--3cols">

          <div style={{ order: '0' }} className="comp-table-cell"><h3>Current Product Name</h3></div>
          <div style={{ order: '1' }} className="comp-table-cell">Has a sword named Ice</div>
          <div style={{ order: '2' }} className="comp-table-cell">No direwolf</div>
          <div style={{ order: '3' }} className="comp-table-cell"><strong>Lord of Winterfell</strong></div>
          <div style={{ order: '4' }} className="comp-table-cell"><h3>Current Product Name</h3></div>
          <div style={{ order: '5' }} className="comp-table-cell">Has a sword named Ice</div>
          <div style={{ order: '6' }} className="comp-table-cell">No direwolf</div>
          <div style={{ order: '7' }} className="comp-table-cell"><strong>Lord of Winterfell</strong></div>

          <div style={{ order: '0' }} className="comp-table-cell"><h3>Characteristic</h3></div>
          {characteristics.map((characteristic) => {
            return characteristicList('something something', 1 )
          })
          }
          {/* <div style={{ order: '1' }} className="comp-table-cell">Has a sword named Longclaw</div>
          <div style={{ order: '2' }} className="comp-table-cell">Direwolf: Ghost</div>
          <div style={{ order: '3' }} className="comp-table-cell"><strong>Knows nothing</strong></div>
          <div style={{ order: '4' }} className="comp-table-cell"><h3>Current Product Name</h3></div>
          <div style={{ order: '5' }} className="comp-table-cell">Has a sword named Ice</div>
          <div style={{ order: '6' }} className="comp-table-cell">No direwolf</div>
          <div style={{ order: '7' }} className="comp-table-cell"><strong>Lord of Winterfell</strong></div> */}

          <div style={{ order: '0' }} className="comp-table-cell"><h3>Related Product Name</h3></div>
          <div style={{ order: '1' }} className="comp-table-cell">Has a sword named Needle</div>
          <div style={{ order: '2' }} className="comp-table-cell">Direwolf: Nymeria</div>
          <div style={{ order: '3' }} className="comp-table-cell"><strong>No one</strong></div>
          <div style={{ order: '4' }} className="comp-table-cell"><h3>Current Product Name</h3></div>
          <div style={{ order: '5' }} className="comp-table-cell">Has a sword named Ice</div>
          <div style={{ order: '6' }} className="comp-table-cell">No direwolf</div>
          <div style={{ order: '7' }} className="comp-table-cell"><strong>Lord of Winterfell</strong></div>

        </div>
      </div>
    </div>
  );
};
export default ComparisonModal;

ComparisonModal.propTypes = {
  closeModalHandler: PropTypes.instanceOf(Object).isRequired,
  modalClass: PropTypes.string.isRequired,
};
