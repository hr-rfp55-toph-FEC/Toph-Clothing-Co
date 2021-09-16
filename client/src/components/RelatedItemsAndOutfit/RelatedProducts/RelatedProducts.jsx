import React from 'react';
import PropTypes from 'prop-types';
import Carousel from '../Carousel';
import ProductListCard from './ProductListCard';

const RelatedProducts = ({ prodsInfo, prodsStyles, prodsMeta }) => (
  <div className="related-product-list-container">
    Related Products Here:
    <Carousel>
      {prodsInfo.map((prodInfo, index) => (
        <ProductListCard
          key={prodInfo.id}
          prodInfo={prodInfo}
          prodStyles={prodsStyles[index]}
          prodMeta={prodsMeta[index]}
        />
      ))}
    </Carousel>
  </div>
);

RelatedProducts.propTypes = {
  prodsInfo: PropTypes.instanceOf(Object).isRequired,
  prodsStyles: PropTypes.instanceOf(Object).isRequired,
  prodsMeta: PropTypes.instanceOf(Object).isRequired,
};

export default RelatedProducts;
