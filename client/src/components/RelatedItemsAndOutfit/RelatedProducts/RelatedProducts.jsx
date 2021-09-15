import React from 'react';
import PropTypes from 'prop-types';
import RelatedCarousel from './RelatedCarousel';

const RelatedProducts = ({ prodsInfo, prodsStyles, prodsMeta }) => (
  <div>
    Related Products Here:
    <RelatedCarousel prodsInfo={prodsInfo} prodsStyles={prodsStyles} prodsMeta={prodsMeta} />
  </div>
);

RelatedProducts.propTypes = {
  prodsInfo: PropTypes.instanceOf(Array).isRequired,
  prodsStyles: PropTypes.instanceOf(Array).isRequired,
  prodsMeta: PropTypes.instanceOf(Array).isRequired,
};

export default RelatedProducts;
