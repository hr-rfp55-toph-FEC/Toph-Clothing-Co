import React from 'react';
import PropTypes from 'prop-types';
import RelatedCarousel from './RelatedCarousel';
import Carousel from './Carousel';

const RelatedProducts = ({ prodsInfo, prodsStyles, prodsMeta }) => (
  <div>
    Related Products Here:
    {/* <RelatedCarousel prodsInfo={prodsInfo}
    prodsStyles={prodsStyles} prodsMeta={prodsMeta} /> */}
    <Carousel>

    </Carousel>
  </div>
);

RelatedProducts.propTypes = {
  prodsInfo: PropTypes.instanceOf(Object).isRequired,
  prodsStyles: PropTypes.instanceOf(Object).isRequired,
  prodsMeta: PropTypes.instanceOf(Object).isRequired,
};

export default RelatedProducts;
