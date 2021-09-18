import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ComparisonModal = ({ closeModalHandler, modalClass, currProd, modalRelProd }) => {
  const [characteristics, setCharacteristics] = useState(['']);
  const [currProdEntries, setCurrProdEntries] = useState(['']);
  const [relProdEntries, setRelProdEntries] = useState(['']);

  const rowItemDiv = (prodChar, orderNumber) => <div style={{ order: `${orderNumber}` }} className="comp-table-cell"><h3>{prodChar}</h3></div>;
  const noValue = (orderNumber) => <div style={{ order: `${orderNumber}` }} className="comp-table-cell" />;
  const characteristicList = (char, orderNumber) => <div style={{ order: `${orderNumber}` }} className="comp-table-cell"><h3>{char}</h3></div>;

  const shouldDisplayModalData = Object.keys(modalRelProd).length !== 0;
  useEffect(() => {
    if (shouldDisplayModalData) {
      const currProdKey = Object.keys(currProd)[0];
      const relProdKey = Object.keys(modalRelProd)[0];
      const currEntries = currProd[currProdKey];
      const relEntries = modalRelProd[relProdKey];
      const currProdChars = Object.keys(currProd[currProdKey]);
      const relProdChars = Object.keys(modalRelProd[relProdKey]);
      const allChars = Array.from(new Set([...currProdChars, ...relProdChars]));
      setCharacteristics(allChars);
      setCurrProdEntries(Object.entries(currEntries));
      setRelProdEntries(Object.entries(relEntries));
    }
  }, [shouldDisplayModalData, currProd, modalRelProd]);

  return (
    <div className={modalClass}>
      <div className="comp-modal-content">
        <button type="button" onClick={closeModalHandler} className="comp-close-modal">&times;</button>
        <h1 className="comp-modal-header">Comparing</h1>
        <div className="comp-table comp-table--3cols">

          <div style={{ order: '0' }} className="comp-table-cell"><h3>{Object.keys(currProd)[0]}</h3></div>
          {characteristics.map((characteristic, index) => {
            for (let i = 0; i < currProdEntries.length; i += 1) {
              if (currProdEntries[i][0] === characteristic) {
                const charVal = currProdEntries[i][1].value;
                return rowItemDiv(charVal, index + 1);
              }
            }
            return noValue(index + 1);
          })}

          <div style={{ order: '0' }} className="comp-table-cell" />
          {characteristics.map((characteristic, index) => characteristicList(characteristic,
            index + 1))}

          <div style={{ order: '0' }} className="comp-table-cell"><h3>{Object.keys(modalRelProd)[0]}</h3></div>
          {characteristics.map((characteristic, index) => {
            for (let i = 0; i < relProdEntries.length; i += 1) {
              if (relProdEntries[i][0] === characteristic) {
                const charVal = relProdEntries[i][1].value;
                return rowItemDiv(charVal, index + 1);
              }
            }
            return noValue(index + 1);
          })}

        </div>
      </div>
    </div>
  );
};
export default ComparisonModal;

ComparisonModal.propTypes = {
  closeModalHandler: PropTypes.instanceOf(Object).isRequired,
  modalClass: PropTypes.string.isRequired,
  currProd: PropTypes.instanceOf(Object).isRequired,
  modalRelProd: PropTypes.instanceOf(Object).isRequired,
};
