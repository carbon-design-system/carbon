/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import { useId, useFallbackId } from '../useId';

describe('useId', () => {
  it('should generate a unique id that is stable across renders', () => {
    function Test() {
      const id = useId('test');
      return <span id={id}>test</span>;
    }

    render(<Test />);
    expect(screen.getByText('test')).toHaveAttribute('id', 'test-:r0:');
  });

  it('should generate a unique id when using the useFallbackId empty', () => {
    function Test() {
      const id = useFallbackId();
      return <span id={id}>test</span>;
    }

    render(<Test />);
    expect(screen.getByText('test')).toHaveAttribute('id', 'id-:r1:');
  });

  it('should recieved a unique id by passing a string on params when using useFallbackId', () => {
    function Test() {
      const id = useFallbackId('idRecieved');
      return <span id={id}>test</span>;
    }

    render(<Test />);
    expect(screen.getByText('test')).toHaveAttribute('id', 'idRecieved');
  });
});
