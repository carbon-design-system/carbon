/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Toggle from '../Toggle';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '../../../../components/scss/components/toggle/_toggle.scss';

describe('Toggle RTL', () => {
  describe('Behaviors', () => {
    it('toggles on click', () => {
      render(<Toggle id="test-id" />);
      expect(screen.getByText('Off')).toBeVisible();
      expect(screen.getByText('On')).not.toBeVisible();
      userEvent.click(screen.getByRole('checkbox'));
      expect(screen.getByText('On')).toBeVisible();
      expect(screen.getByText('Off')).not.toBeVisible();
    });

    it('toggles on keydown - enter', () => {
      render(<Toggle id="test-id" />);
      expect(screen.getByText('Off')).toBeVisible();
      expect(screen.getByText('On')).not.toBeVisible();
      userEvent.type(screen.getByRole('checkbox'), 'enter');
      expect(screen.getByText('On')).toBeVisible();
      expect(screen.getByText('Off')).not.toBeVisible();
    });

    it('toggles on keydown - space', () => {
      render(<Toggle id="test-id" />);
      expect(screen.getByText('Off')).toBeVisible();
      expect(screen.getByText('On')).not.toBeVisible();
      userEvent.type(screen.getByRole('checkbox'), 'space');
      expect(screen.getByText('On')).toBeVisible();
      expect(screen.getByText('Off')).not.toBeVisible();
    });
  });

  describe('Props', () => {
    it('add custom class name to wrapper div', () => {
      const { container } = render(
        <Toggle id="test-id" className="custom-class" />
      );
      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('sets toggled based on defaultToggled on render', () => {
      render(<Toggle id="test-id" defaultToggled={true} />);
      expect(screen.getByText('On')).toBeVisible();
    });

    it('calls onChange when the control is changed', () => {
      const onChange = jest.fn();
      render(<Toggle id="test-id" onChange={onChange} />);
      userEvent.click(screen.getByRole('checkbox'));
      expect(onChange).toHaveBeenCalled();
    });

    it('calls onToggle when toggled', () => {
      const onToggle = jest.fn();
      render(<Toggle id="test-id" onToggle={onToggle} />);
      userEvent.click(screen.getByRole('checkbox'));
      expect(onToggle).toHaveBeenCalled();
    });

    it('takes in custom labels for toggled and untoggled states', () => {
      render(<Toggle id="test-id" labelA="test On" labelB="test Off" />);
      expect(screen.getByText('test On')).toBeInTheDocument();
      expect(screen.getByText('test Off')).toBeInTheDocument();
    });

    it('sets toggled based on toggled prop', () => {
      const { rerender } = render(<Toggle id="test-id" toggled={false} />);
      expect(screen.getByText('Off')).toBeVisible();
      rerender(<Toggle id="test-id" toggled={true} />);
      expect(screen.getByText('On')).toBeVisible();
    });

    it('passes extra props to input', () => {
      render(<Toggle id="test-id" aria-disabled={true} />);
      expect(screen.getByRole('checkbox')).toHaveAttribute(
        'aria-disabled',
        'true'
      );
    });
  });
});
