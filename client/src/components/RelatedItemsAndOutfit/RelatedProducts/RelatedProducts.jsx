import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from '../Carousel';
import ListCard from '../ListCard';
import ComparisonModal from '../ComparisonModal.jsx';

const RelatedProducts = ({
  prodsInfo, prodsStyles, prodsMeta,
  currProd, changeProductHandler,
}) => {
  const [modalClass, setModalClass] = useState('comparison-modal-container');
  const [modalRelProd, setmodalRelProd] = useState({});
  const currProdDes = {
    [currProd[0].name]: currProd[2].characteristics,
  };
  const openModelHandler = (relProdName, relProdMeta) => {
    setmodalRelProd({ [relProdName]: relProdMeta });
    setModalClass('comparison-modal-container comp-show-modal');
  };
  const closeModalHandler = () => {
    setModalClass('comparison-modal-container');
  };
  return (
    <div className="related-product-list-container">
      <ComparisonModal
        modalClass={modalClass}
        closeModalHandler={closeModalHandler}
        currProd={currProdDes}
        modalRelProd={modalRelProd}
      />
      <h2 className="related-products-header">RELATED PRODUCTS</h2>
      <Carousel currProd={currProd}>
        <></>
        {prodsInfo.map((prodInfo, index) => (
          <ListCard
            key={`${prodInfo.id}BG${Math.random() * 10000}`}
            prodInfo={prodInfo}
            prodStyles={prodsStyles[index].results[0]}
            prodMeta={prodsMeta[index]}
            changeProductHandler={changeProductHandler}
          >
            <button type="button" onClick={() => openModelHandler(prodInfo.name, prodsMeta[index].characteristics)} className="card-button">
              <i className="far fa-star star-for-button" />
            </button>
          </ListCard>
        ))}
      </Carousel>
    </div>
  );
};

RelatedProducts.propTypes = {
  prodsInfo: PropTypes.instanceOf(Object).isRequired,
  prodsStyles: PropTypes.instanceOf(Object).isRequired,
  prodsMeta: PropTypes.instanceOf(Object).isRequired,
  currProd: PropTypes.instanceOf(Object).isRequired,
  changeProductHandler: PropTypes.instanceOf(Function).isRequired,
};

const areEqual = (prevProps, nextProps) => {
  if (prevProps.currProd[0].id === nextProps.currProd[0].id) {
    return true;
  }
  return false;
};

export default React.memo(RelatedProducts, areEqual);
