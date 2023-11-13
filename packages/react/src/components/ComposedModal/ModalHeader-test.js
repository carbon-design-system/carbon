/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render } from '@testing-library/react';
import { ModalHeader } from './ModalHeader';

const prefix = 'cds';

describe('ModalHeader', () => {
  it('should render title if has title text', () => {
    const { container } = render(<ModalHeader title="Carbon" />);

    expect(container.firstChild).toHaveTextContent('Carbon');
  });

  it('should label if has label text', () => {
    const { container } = render(<ModalHeader label="Carbon label" />);

    expect(container.firstChild).toHaveTextContent('Carbon label');
  });

  it('should render with a ref', () => {
    const ref = React.createRef();
    render(<ModalHeader label="Carbon label" ref={ref} />);

    expect(ref.current).toHaveClass(`${prefix}--modal-header`);
  });
});
