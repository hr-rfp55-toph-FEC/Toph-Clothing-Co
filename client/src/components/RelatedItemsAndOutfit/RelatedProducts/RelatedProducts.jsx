import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Carousel from '../Carousel';
import ListCard from '../ListCard';
import ComparisonModal from '../ComparisonModal.jsx';

const RelatedProducts = ({
  prodsInfo, prodsStyles, prodsMeta,
  currProd, onRelatedCardClick,
}) => {
  const [modalClass, setModalClass] = useState('comparison-modal-container');
  const [modalRelProd, setmodalRelProd] = useState({});
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
        currProd={{
          [currProd[0].name]: currProd[2].characteristics,
        }}
        modalRelProd={modalRelProd}
      />
      <h2 className="related-products-header">RELATED PRODUCTS</h2>
      <Carousel>
        {prodsInfo.map((prodInfo, index) => (
          <ListCard
            key={prodInfo.id}
            prodInfo={prodInfo}
            prodStyles={prodsStyles[index]}
            prodMeta={prodsMeta[index]}
            onRelatedCardClick={onRelatedCardClick}
          >
            <button type="button" onClick={() => openModelHandler(prodInfo.name, prodsMeta[index].characteristics)} className="card-button">
              <i className="far fa-star star-for-button" />
              {/* <img src="../../assets/earth-symbol.png" className="far fa-star star-for-button"/> */}
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
  onRelatedCardClick: PropTypes.instanceOf(Function).isRequired,
};

export default RelatedProducts;
