import React from 'react';
import Carousel from './Carousel';

const RelatedProducts = ({ prodsInfo, prodsStyles, prodsMeta }) => {
  const placeholder = { prodsStyles };
  return (
    <div>
      Related Products Here:
      <Carousel isRelatedProducts={true} prodsInfo={prodsInfo} prodsStyles={prodsStyles} prodsMeta={prodsMeta} />
    </div>
  );
};

// RelatedProducts.propTypes = {
//   relatedProds: PropTypes.array,
// };

export default RelatedProducts;
