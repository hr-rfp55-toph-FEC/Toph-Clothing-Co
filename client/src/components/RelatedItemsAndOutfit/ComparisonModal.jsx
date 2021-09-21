import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Stars from '../Stars';

const ComparisonModal = ({
  closeModalHandler, modalClass, currProd, modalRelProd,
}) => {
  const [characteristics, setCharacteristics] = useState(['']);
  const [currProdEntries, setCurrProdEntries] = useState(['']);
  const [relProdEntries, setRelProdEntries] = useState(['']);

  // const shouldDisplayModalData = Object.keys(modalRelProd).length !== 0;
  useEffect(() => {
    if (Object.keys(modalRelProd).length !== 0) {
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
  }, [currProd, modalRelProd]);

  const rowItemDiv = (prodChar, orderNumber, id) => <div key={id} style={{ order: `${orderNumber}` }} className="comp-table-cell"><h3>{prodChar}</h3></div>;
  const noValue = (orderNumber, id) => <div key={id} style={{ order: `${orderNumber}` }} className="comp-table-cell" />;
  const characteristicList = (char, orderNumber, id) => <div key={id} style={{ order: `${orderNumber}` }} className="comp-table-cell"><h3>{char}</h3></div>;

  return (
    <div className={modalClass}>
      <div className="comp-modal-content">
        <button type="button" onClick={closeModalHandler} className="comp-close-modal">&times;</button>
        <h1 className="comp-modal-header">Comparing</h1>
        <div className="comp-table comp-table--3cols">
          {/* Table column 1 */}
          <div style={{ order: '0' }} className="comp-table-cell"><h3>{Object.keys(currProd)[0]}</h3></div>
          {characteristics.map((characteristic, index) => {
            for (let i = 0; i < currProdEntries.length; i += 1) {
              if (currProdEntries[i][0] === characteristic) {
                const charVal = currProdEntries[i][1].value;
                if (charVal === null) break;
                const prodId = `BGM-${currProdEntries[i][1].id}${Math.random() * 100000}`;
                return rowItemDiv(
                  <Stars key={prodId} rating={Number(charVal)} id={prodId} />,
                  index + 1, prodId,
                );
              }
            }
            return noValue(index + 1, `bga${100000 * Math.random()}`);
          })}
          {/* Table column 2 */}
          <div style={{ order: '0' }} className="comp-table-cell" />
          {characteristics.map((characteristic, index) => characteristicList(characteristic,
            index + 1, `bg${characteristic}bg`))}
          {/* Table column 3 */}
          <div style={{ order: '0' }} className="comp-table-cell"><h3>{Object.keys(modalRelProd)[0]}</h3></div>
          {characteristics.map((characteristic, index) => {
            for (let i = 0; i < relProdEntries.length; i += 1) {
              if (relProdEntries[i][0] === characteristic) {
                const charVal = relProdEntries[i][1].value;
                if (charVal === null) break;
                const prodId = `BGM-${currProdEntries[i][1].id}${Math.random() * 100000}`;
                return rowItemDiv(
                  <Stars key={prodId} rating={Number(charVal)} id={prodId} />,
                  index + 1, prodId,
                );
              }
            }
            return noValue(index + 1, `bga${100000 * Math.random()}`);
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


// class ComparisonModal extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       characteristics: [''],
//       currProdEntries: [''],
//       relProdEntries: [''],
//     };
//   }

//   componentDidUpdate(prevProps) {
//     const {
//       currProd, modalRelProd,
//     } = this.props;
//     if (modalRelProd !== prevProps.modalRelProd) {
//       const currProdKey = Object.keys(currProd)[0];
//       const relProdKey = Object.keys(modalRelProd)[0];
//       const currEntries = currProd[currProdKey];
//       const relEntries = modalRelProd[relProdKey];
//       const currProdChars = Object.keys(currProd[currProdKey]);
//       const relProdChars = Object.keys(modalRelProd[relProdKey]);
//       const allChars = Array.from(new Set([...currProdChars, ...relProdChars]));
//       this.setTheState(allChars, currEntries, relEntries);
//     }
//   }

//   setTheState(allChars, currEntries, relEntries) {
//     this.setState({
//       characteristics: allChars,
//       currProdEntries: Object.entries(currEntries),
//       relProdEntries: Object.entries(relEntries),
//     });
//   }

//   render() {
//     const {
//       closeModalHandler, modalClass, currProd, modalRelProd,
//     } = this.props;

//     const rowItemDiv = (prodChar, orderNumber, id) => <div key={id} style={{ order: `${orderNumber}` }} className="comp-table-cell"><h3>{prodChar}</h3></div>;
//     const noValue = (orderNumber, id) => <div key={id} style={{ order: `${orderNumber}` }} className="comp-table-cell" />;
//     const characteristicList = (char, orderNumber, id) => <div key={id} style={{ order: `${orderNumber}` }} className="comp-table-cell"><h3>{char}</h3></div>;

//     const { characteristics, currProdEntries, relProdEntries } = this.state;

//     if (Object.keys(modalRelProd).length !== 0) {
//       return (
//         <div className={modalClass}>
//           <div className="comp-modal-content">
//             <button type="button" onClick={closeModalHandler} className="comp-close-modal">&times;</button>
//             <h1 className="comp-modal-header">Comparing</h1>
//             <div className="comp-table comp-table--3cols">

//               <div style={{ order: '0' }} className="comp-table-cell"><h3>{Object.keys(currProd)[0]}</h3></div>
//               {characteristics.map((characteristic, index) => {
//                 for (let i = 0; i < currProdEntries.length; i += 1) {
//                   if (currProdEntries[i][0] === characteristic) {
//                     const charVal = currProdEntries[i][1].value;
//                     const prodId = `BGM-${currProdEntries[i][1].id}`;
//                     return rowItemDiv(
//                       <Stars key={prodId} rating={Number(charVal)} id={prodId} />,
//                       index + 1, prodId,
//                     );
//                     // return rowItemDiv(charVal, index + 1);
//                   }
//                 }
//                 return noValue(index + 1, `ab${20000 * Math.random()}`);
//               })}

//               <div style={{ order: '0' }} className="comp-table-cell" />
//               {characteristics.map((characteristic, index) => characteristicList(characteristic,
//                 index + 1))}

//               <div style={{ order: '0' }} className="comp-table-cell"><h3>{Object.keys(modalRelProd)[0]}</h3></div>
//               {characteristics.map((characteristic, index) => {
//                 for (let i = 0; i < relProdEntries.length; i += 1) {
//                   if (relProdEntries[i][0] === characteristic) {
//                     const charVal = relProdEntries[i][1].value;
//                     const prodId = `BGM-${relProdEntries[i][1].id}`;
//                     return rowItemDiv(
//                       <Stars key={prodId} rating={Number(charVal)} id={prodId} />,
//                       index + 1, prodId,
//                     );
//                     // return rowItemDiv(charVal, index + 1);
//                   }
//                 }
//                 return noValue(index + 1, `ab${20000 * Math.random()}`);
//               })}

//             </div>
//           </div>
//         </div>
//       );
//     }
//     return <div>Loading...</div>;
//   }
// }