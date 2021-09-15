import React from 'react';
import RelatedCarousel from './RelatedCarousel';

const RelatedProducts = ({ prodsInfo, prodsStyles, prodsMeta }) => {
  console.log(prodsInfo);
  return (
    <div>
      Related Products Here:
      <RelatedCarousel prodsInfo={prodsInfo} prodsStyles={prodsStyles} prodsMeta={prodsMeta} />
    </div>
  );
};

// RelatedProducts.propTypes = {
//   relatedProds: PropTypes.array,
// };

export default RelatedProducts;
