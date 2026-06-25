/* eslint-disable react/prop-types */
/**
 * Copyright IBM Corp. 2024
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useState } from 'react';
import { useWindowResize } from '../useWindowResize';
import { render, screen, fireEvent } from '@testing-library/react';

const TestComponent = (props) => {
  const { throttleInterval } = props;
  const [height, setHeight] = useState(false);
  useWindowResize(
    ({ current }) => {
      const { innerHeight } = current;
      setHeight(innerHeight);
    },
    [],
    throttleInterval
  );
  return <div>{height}</div>;
};

describe('useWindowsResize', () => {
  it('works by default', () => {
    render(<TestComponent />);
    window.innerWidth = 500;
    fireEvent(window, new Event('resize'));
    screen.getByText('768');
  });

  it('works with throttle', () => {
    render(<TestComponent throttleInterval={10} />);
    window.innerWidth = 500;
    fireEvent(window, new Event('resize'));
    window.innerWidth = 505;
    fireEvent(window, new Event('resize'));
    screen.getByText('768');
  });
});
