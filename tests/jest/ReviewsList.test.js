import React from 'react';
import {
  render, fireEvent, waitFor, screen, cleanup,
} from '@testing-library/react';

import RatingsAndReviews from '../../client/src/components/RatingsAndReviews/RatingsAndReviews';
import ReviewsList from '../../client/src/components/RatingsAndReviews/ReviewsList';
import ReviewTile from '../../client/src/components/RatingsAndReviews/ReviewTile';

describe('RatingsAndReviews component', () => {
  beforeAll(() => {
    render(<RatingsAndReviews />);
  });

  test('should include the ratings and reviews section in the dom', () => {
    const heading = 'ratings & reviews';

    expect(screen.getByText(heading)).toBeInTheDocument();
  });

  afterAll(cleanup);
});
