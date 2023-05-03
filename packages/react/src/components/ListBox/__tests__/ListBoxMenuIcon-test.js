/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import React from 'react';
import ListBox from '../';

describe('ListBoxMenuIcon', () => {
  it('should support translating the close menu message', () => {
    const translateWithId = jest.fn((id) => {
      if (id === 'close.menu') {
        return 'test';
      }
      throw new Error(`Unsupported id: ${id}`);
    });

    render(<ListBox.MenuIcon isOpen translateWithId={translateWithId} />);

    expect(screen.getByLabelText('test')).toBeInTheDocument();
  });

  it('should support translating the open menu message', () => {
    const translateWithId = jest.fn((id) => {
      if (id === 'open.menu') {
        return 'test';
      }
      throw new Error(`Unsupported id: ${id}`);
    });

    render(
      <ListBox.MenuIcon isOpen={false} translateWithId={translateWithId} />
    );

    expect(screen.getByLabelText('test')).toBeInTheDocument();
  });
});
