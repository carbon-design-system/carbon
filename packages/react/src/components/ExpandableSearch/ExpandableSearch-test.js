/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ExpandableSearch from './ExpandableSearch';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('ExpandableSearch', () => {
  describe('behaves as expected', () => {
    it('is not expanded by default', () => {
      const { container } = render(
        <ExpandableSearch labelText="test-search" />
      );

      // There is not a reliable way to test for expansion other than by class.
      // We can not use .toBeVisible on the input because the input is hidden
      // via width, not via `display: none` or similar.
      expect(container.firstChild).not.toHaveClass(
        `${prefix}--search--expanded`
      );
    });

    it('expands on click', async () => {
      const { container } = render(
        <ExpandableSearch labelText="test-search" />
      );

      await userEvent.click(screen.getAllByRole('button')[0]);

      expect(container.firstChild).toHaveClass(`${prefix}--search--expanded`);
    });

    it('places focus on the input after expansion', async () => {
      render(<ExpandableSearch labelText="test-search" />);

      await userEvent.click(screen.getAllByRole('button')[0]);

      expect(screen.getByRole('searchbox')).toHaveFocus();
    });

    it('closes on blur when the input is empty', async () => {
      // Render a button next to the search so that there is another focusable element
      // next to the expandable search to receive focus.
      const { container } = render(
        <>
          <ExpandableSearch labelText="test-search" />
          <button type="button">second-element</button>
        </>
      );

      expect(container.firstChild).not.toHaveClass(
        `${prefix}--search--expanded`
      );

      await userEvent.click(screen.getAllByRole('button')[0]);

      expect(container.firstChild).toHaveClass(`${prefix}--search--expanded`);

      await userEvent.click(screen.getByText('second-element'));

      expect(container.firstChild).not.toHaveClass(
        `${prefix}--search--expanded`
      );
    });

    it('does not close on blur when the input has a value', async () => {
      // Render a button next to the search so that there is another focusable element
      // next to the expandable search to receive focus.
      const { container } = render(
        <>
          <ExpandableSearch labelText="test-search" />
          <button type="button">second-element</button>
        </>
      );

      await userEvent.click(screen.getAllByRole('button')[0]);
      await userEvent.type(screen.getByRole('searchbox'), 'test-value');
      await userEvent.click(screen.getByText('second-element'));

      expect(container.firstChild).toHaveClass(`${prefix}--search--expanded`);
    });
  });
});
