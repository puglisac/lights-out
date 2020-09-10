import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Board from './board';

beforeEach(function() {
    jest
      .spyOn(Math, "random")
      .mockReturnValueOnce(0.25)
      .mockReturnValueOnce(1.75);
  });
  


test("renders without crashing", function() {
  render(<Board />);
});

test("matches snapshot", function() {
  const {asFragment} = render(<Board />);
  expect(asFragment()).toMatchSnapshot();
});


afterEach(function() {
    Math.random.mockRestore();
  });