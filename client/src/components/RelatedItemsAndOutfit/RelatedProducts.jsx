import React from 'react';
import Carousel from './Carousel';

const RelatedProducts = ({ ProdsInfo, ProdStyles }) => {
  const placeholder = { ProdStyles };
  return (
    <div>
      Related Products Here:
      <Carousel ProdsInfo={ProdsInfo} ProdStyles={ProdStyles} />
    </div>
  );
};

// RelatedProducts.propTypes = {
//   relatedProds: PropTypes.array,
// };

export default RelatedProducts;
