import React from 'react';
import PropTypes from 'prop-types';
import Carousel from '../Carousel';
import ListCard from '../ListCard';

const RelatedProducts = ({ prodsInfo, prodsStyles, prodsMeta }) => {
  const openModel = () => {
    console.log('open model!');
  };

  return (
    <div className="related-product-list-container">
      <h2 className="related-products-header">RELATED PRODUCTS</h2>
      <Carousel>
        {prodsInfo.map((prodInfo, index) => (
          <ListCard
            key={prodInfo.id}
            prodInfo={prodInfo}
            prodStyles={prodsStyles[index]}
            prodMeta={prodsMeta[index]}
          >
            <button type="button" onClick={openModel} className="card-button">
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
};

export default RelatedProducts;
