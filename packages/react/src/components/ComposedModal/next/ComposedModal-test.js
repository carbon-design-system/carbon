/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { ModalHeader } from '../ComposedModal';

describe('ModalHeader', () => {
  it('should render title if has title text', () => {
    const { container } = render(<ModalHeader title="Carbon" />);

    expect(container.firstChild).toHaveAttribute('title', 'Carbon');
  });

  it('should label if has label text', () => {
    const { container } = render(<ModalHeader label="Carbon label" />);

    expect(container.firstChild).toHaveAttribute('title', 'Carbon label');
  });
});

// TODO: write tests for composed modal
// TODO: write tests for modal body
// TODO: write tests for modal footer
