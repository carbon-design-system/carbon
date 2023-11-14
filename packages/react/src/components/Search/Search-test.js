/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Search from './Search';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';

const prefix = 'cds';

describe('Search', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props onto the input element', () => {
      render(<Search labelText="test-search" data-testid="test-id" />);

      expect(screen.getByRole('searchbox')).toHaveAttribute(
        'data-testid',
        'test-id'
      );
    });

    it('should respect autoComplete prop', () => {
      render(<Search labelText="test-search" autoComplete="test" />);

      expect(screen.getByRole('searchbox')).toHaveAttribute(
        'autoComplete',
        'test'
      );
    });

    it('should support a custom `className` prop on the outermost element', () => {
      const { container } = render(
        <Search labelText="test-search" className="custom-class" />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should respect closeButtonLabelText prop', () => {
      render(<Search labelText="test-search" closeButtonLabelText="clear" />);

      expect(screen.getByLabelText('clear')).toBeInTheDocument();
    });

    it('should respect defaultValue prop', () => {
      render(<Search labelText="test-search" defaultValue="test-value" />);

      expect(screen.getByRole('searchbox')).toHaveValue('test-value');
    });

    it('should respect disabled prop', () => {
      render(<Search labelText="test-search" disabled />);

      expect(screen.getByRole('searchbox')).toBeDisabled();
    });

    it('should respect id prop', () => {
      render(<Search labelText="test-search" id="test-id" />);

      expect(screen.getByRole('searchbox')).toHaveAttribute('id', 'test-id');
    });

    it('should respect labelText prop', () => {
      render(<Search labelText="test-search" />);

      expect(screen.getByRole('searchbox').labels[0]).toHaveTextContent(
        'test-search'
      );
    });

    it('should call onChange when expected', async () => {
      const onChange = jest.fn();
      render(<Search labelText="test-search" onChange={onChange} />);

      await userEvent.type(screen.getByRole('searchbox'), 'test');

      expect(onChange).toHaveBeenCalled();
    });

    it('should respect onClear prop', async () => {
      const onClear = jest.fn();
      render(
        <Search
          labelText="test-search"
          closeButtonLabelText="clear"
          onClear={onClear}
        />
      );

      await userEvent.click(screen.getByLabelText('clear'));

      expect(onClear).toHaveBeenCalled();
    });

    it('should respect onExpand prop', async () => {
      const onExpand = jest.fn();
      render(<Search labelText="test-search" onExpand={onExpand} />);

      await userEvent.click(screen.getAllByRole('button')[0]);

      expect(onExpand).toHaveBeenCalled();

      await screen.getAllByRole('button')[0].focus();

      await userEvent.keyboard('[Space]');

      expect(onExpand).toHaveBeenCalledTimes(2);

      await screen.getAllByRole('button')[0].focus();

      await userEvent.keyboard('[Enter]');

      expect(onExpand).toHaveBeenCalledTimes(3);
    });

    it('should call onKeyDown when expected', async () => {
      const onKeyDown = jest.fn();
      render(<Search labelText="test-search" onKeyDown={onKeyDown} />);

      await userEvent.type(screen.getByRole('searchbox'), 'test');

      expect(onKeyDown).toHaveBeenCalled();
    });

    it('should call focus expand button on Escape when expanded', async () => {
      render(
        <Search labelText="test-search" onExpand={() => {}} isExpanded={true} />
      );

      await screen.getByRole('searchbox').focus();

      await userEvent.keyboard('[Escape]');

      expect(screen.getAllByRole('button')[0]).toHaveFocus();
    });

    it('should have tabbable button and untabbable input if expandable and not expanded', async () => {
      render(
        <Search
          labelText="test-search"
          onExpand={() => {}}
          isExpanded={false}
        />
      );

      expect(screen.getAllByRole('button')[0]).toHaveAttribute('tabIndex', '0');
      expect(screen.getByRole('searchbox')).toHaveAttribute('tabIndex', '-1');
    });

    it('should have tabbable input and untabbable button if not expandable', async () => {
      render(<Search labelText="test-search" />);

      // will only have 1 button which is the close button
      expect(screen.getAllByRole('button').length).toBe(1);
      expect(screen.getByRole('searchbox')).not.toHaveAttribute(
        'tabIndex',
        '-1'
      );
    });

    it('should respect placeholder prop', () => {
      render(<Search labelText="test-search" placeholder="test-placeholder" />);

      expect(
        screen.getByPlaceholderText('test-placeholder')
      ).toBeInTheDocument();
    });

    it('should respect renderIcon prop', () => {
      const CustomIcon = jest.fn(() => <svg data-testid="test-icon" />);
      render(<Search labelText="test-search" renderIcon={CustomIcon} />);

      expect(screen.getByRole('search')).toContainElement(
        screen.getByTestId('test-icon')
      );
      expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('should respect role prop', () => {
      render(<Search labelText="test-search" role="combobox" />);

      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('should respect size prop', () => {
      render(<Search labelText="test-search" size="sm" />);

      expect(screen.getByRole('search')).toHaveClass(`${prefix}--search--sm`);
    });

    it('should respect type prop', () => {
      render(<Search labelText="test-search" type="search" />);

      expect(screen.getByRole('searchbox')).toHaveAttribute('type', 'search');
    });

    it('should respect value prop', () => {
      render(<Search labelText="test-search" value="test-value" />);

      expect(screen.getByRole('searchbox')).toHaveValue('test-value');
    });
  });
});
