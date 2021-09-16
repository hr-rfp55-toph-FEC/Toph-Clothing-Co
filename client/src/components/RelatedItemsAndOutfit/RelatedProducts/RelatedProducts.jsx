import React from 'react';
import PropTypes from 'prop-types';
import RelatedCarousel from './RelatedCarousel';
import Carousel from './Carousel';

const RelatedProducts = ({ prodsInfo, prodsStyles, prodsMeta }) => (
  <div className="related-products-container">
    Related Products Here:
    {/* <RelatedCarousel prodsInfo={prodsInfo}
    prodsStyles={prodsStyles} prodsMeta={prodsMeta} /> */}
    <Carousel
      prodsInfo={prodsInfo}
      prodsStyles={prodsStyles}
      prodsMeta={prodsMeta}
    />
  </div>
);

RelatedProducts.propTypes = {
  prodsInfo: PropTypes.instanceOf(Object).isRequired,
  prodsStyles: PropTypes.instanceOf(Object).isRequired,
  prodsMeta: PropTypes.instanceOf(Object).isRequired,
};

export default RelatedProducts;
