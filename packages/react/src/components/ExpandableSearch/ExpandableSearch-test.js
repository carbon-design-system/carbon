/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import ExpandableSearch from './ExpandableSearch';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';

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

    it('is expanded by default if expanded prop is set', () => {
      const { container } = render(
        <ExpandableSearch isExpanded labelText="test-search" />
      );

      // There is not a reliable way to test for expansion other than by class.
      // We can not use .toBeVisible on the input because the input is hidden
      // via width, not via `display: none` or similar.
      expect(container.firstChild).toHaveClass(`${prefix}--search--expanded`);
    });

    it('is renders a defaultValue', () => {
      render(
        <ExpandableSearch
          defaultValue="This is default text"
          labelText="test-search"
        />
      );
      expect(screen.getByRole('searchbox')).toHaveValue('This is default text');
    });

    it('expands on click', async () => {
      const { container } = render(
        <ExpandableSearch labelText="test-search" />
      );

      await userEvent.click(screen.getAllByRole('button')[0]);

      expect(container.firstChild).toHaveClass(`${prefix}--search--expanded`);
    });

    it('expands on enter', async () => {
      const { container } = render(
        <ExpandableSearch labelText="test-search" />
      );

      const expandControl = container.querySelector('.cds--search-magnifier');
      expect(expandControl).not.toBeNull();

      await act(async () => {
        expandControl.focus();
      });

      await userEvent.keyboard('[Enter]');

      expect(container.firstChild).toHaveClass(`${prefix}--search--expanded`);
    });

    it('expands on space', async () => {
      const { container } = render(
        <ExpandableSearch labelText="test-search" />
      );

      const expandControl = container.querySelector('.cds--search-magnifier');
      expect(expandControl).not.toBeNull();

      await act(async () => {
        expandControl.focus();
      });

      await userEvent.keyboard('[Space]');

      expect(container.firstChild).toHaveClass(`${prefix}--search--expanded`);
    });

    it('places focus on the input after expansion', async () => {
      render(<ExpandableSearch labelText="test-search" />);

      await userEvent.click(screen.getAllByRole('button')[0]);

      expect(screen.getByRole('searchbox')).toHaveFocus();
    });

    it('supports a ref on the underlying input element', () => {
      const ref = jest.fn();
      const { container } = render(
        <ExpandableSearch labelText="Search" ref={ref} />
      );
      expect(ref).toHaveBeenCalledWith(expect.any(HTMLInputElement));
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

    it('closes and clears value on escape', async () => {
      const { container } = render(
        <ExpandableSearch labelText="test-search" />
      );

      await userEvent.click(screen.getAllByRole('button')[0]);

      expect(container.firstChild).toHaveClass(`${prefix}--search--expanded`);

      await userEvent.type(screen.getByRole('searchbox'), 'test-value');

      expect(screen.getByRole('searchbox')).toHaveValue('test-value');

      await userEvent.keyboard('[Escape]');

      expect(screen.getByRole('searchbox')).not.toHaveValue('test-value');

      expect(container.firstChild).toHaveClass(`${prefix}--search--expanded`);

      await userEvent.keyboard('[Escape]');

      expect(container.firstChild).not.toHaveClass(
        `${prefix}--search--expanded`
      );
    });
  });
});
