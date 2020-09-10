import React from 'react';
import { render } from '@testing-library/react';
import Cell from './cell';

test("renders without crashing", function() {
  render(<Cell />);
});

test("matches snapshot", function() {
  const {asFragment} = render(<Cell />);
  expect(asFragment()).toMatchSnapshot();
});
