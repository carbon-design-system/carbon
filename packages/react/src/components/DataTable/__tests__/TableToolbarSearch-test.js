/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import TableToolbarSearch from '../TableToolbarSearch';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

describe('TableToolbarSearch', () => {
  describe('renders as expected - Component API', () => {
    it('should render', () => {
      const { container } = render(
        <TableToolbarSearch
          className="custom-class"
          onChange={jest.fn()}
          id="custom-id"
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <TableToolbarSearch className="custom-class" />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should respect defaultExpanded prop', () => {
      const { container } = render(<TableToolbarSearch defaultExpanded />);

      expect(container.firstChild).toHaveClass(
        'cds--toolbar-search-container-active'
      );
    });

    it('should respect disabled prop', () => {
      const { container } = render(<TableToolbarSearch disabled />);

      expect(container.firstChild).toHaveClass(
        'cds--toolbar-search-container-disabled'
      );
    });

    it('should respect expanded prop', () => {
      const { container } = render(<TableToolbarSearch expanded />);

      expect(container.firstChild).toHaveClass(
        'cds--toolbar-search-container-active'
      );
    });

    it('should respect labelText prop', () => {
      render(<TableToolbarSearch labelText="test label" />);

      expect(screen.getByText('test label')).toBeInTheDocument();
    });

    it('should respect persistent prop', () => {
      const { container } = render(<TableToolbarSearch persistent />);

      expect(container.firstChild).toHaveClass(
        'cds--toolbar-search-container-persistent'
      );
    });

    it('should respect placeholder prop', () => {
      render(<TableToolbarSearch placeholder="Placeholder text" />);

      expect(
        screen.getByPlaceholderText('Placeholder text')
      ).toBeInTheDocument();
    });

    it('should respect searchContainerClass prop', () => {
      const { container } = render(
        <TableToolbarSearch searchContainerClass="test-class" />
      );

      expect(container.firstChild).toHaveClass('test-class');
    });

    it('should respect size prop', () => {
      const { container } = render(<TableToolbarSearch size="sm" />);

      expect(container.firstChild).toHaveClass('cds--search--sm');
    });
  });

  describe('behaves as expected', () => {
    it('should call onBlur when expected', async () => {
      const onBlur = jest.fn();
      render(<TableToolbarSearch onBlur={onBlur} />);
      await userEvent.click(
        screen.getByRole('button', { name: 'Clear search input' })
      );
      await userEvent.tab();

      expect(onBlur).toHaveBeenCalled();
    });

    it('should call onChange when expected', async () => {
      const onChange = jest.fn();
      render(<TableToolbarSearch onChange={onChange} />);
      await userEvent.click(
        screen.getByRole('button', { name: 'Clear search input' })
      );
      await userEvent.tab();
      expect(onChange).toHaveBeenCalled();
    });

    it('should expand/contract as normal when no onBlur/onFocus provided', async () => {
      const { container } = render(<TableToolbarSearch onChange={jest.fn()} />);

      await userEvent.click(screen.getByRole('searchbox'));

      expect(container.firstChild).toHaveClass(
        'cds--toolbar-search-container-active'
      );

      await userEvent.tab();
      expect(container.firstChild).not.toHaveClass(
        'cds--toolbar-search-container-active'
      );
    });
  });
});
