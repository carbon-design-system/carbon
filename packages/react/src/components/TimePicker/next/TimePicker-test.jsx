/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { default as TimePicker } from './TimePicker';

import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('TimePicker', () => {
  describe('input', () => {
    it('renders as expected', () => {
      render(<TimePicker id="time-picker" />);
      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('passes classNames as expected', () => {
      render(<TimePicker id="time-picker" className="🚀" />);
      expect(screen.getByRole('textbox')).toHaveClass('🚀');
    });

    it('should set type as expected', () => {
      render(<TimePicker id="time-picker" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    });

    it('should set value as expected', () => {
      render(<TimePicker id="time-picker" value="🐶" />);
      expect(screen.getByRole('textbox')).toHaveAttribute('value', '🐶');
    });

    it('should set disabled as expected', () => {
      const onClick = jest.fn();
      render(<TimePicker id="time-picker" onClick={onClick} disabled />);
      fireEvent.click(screen.getByRole('textbox'));
      expect(onClick).not.toHaveBeenCalled();
    });

    it('should set placeholder as expected', () => {
      render(<TimePicker id="time-picker" placeholder="🧸" />);
      expect(screen.getByPlaceholderText('🧸')).toBeInTheDocument();
    });
  });

  describe('label', () => {
    it('does not render a label by default', () => {
      render(<TimePicker id="time-picker" />);
      expect(screen.queryByLabelText('🐳')).not.toBeInTheDocument();
    });

    it('renders a label as expected', () => {
      render(<TimePicker id="time-picker" labelText="🐳" />);
      expect(screen.getByLabelText('🐳')).toBeInTheDocument();
    });
  });

  describe('events', () => {
    it('should write text inside the textbox', () => {
      render(<TimePicker id="time-picker" />);
      userEvent.type(screen.getByRole('textbox'), '🧛');
      expect(screen.getByRole('textbox')).toHaveValue('🧛');
    });
  });
});
