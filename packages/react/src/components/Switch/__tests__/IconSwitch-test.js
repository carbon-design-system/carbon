/**
 * Copyright IBM Corp. 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import IconSwitch from '../IconSwitch';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Workspace } from '@carbon/icons-react';

const prefix = 'cds';

describe('IconSwitch', () => {
  describe('renders as expected - Component API', () => {
    it('should spread extra props into `IconButton`', () => {
      render(
        <IconSwitch text="Workspace" data-testid="test-id">
          <Workspace />
        </IconSwitch>
      );
      expect(screen.getByRole('tab')).toHaveAttribute('data-testid', 'test-id');
    });

    it('should support a custom `className` prop on the button element', () => {
      render(
        <IconSwitch text="Workspace" className="custom-class">
          <Workspace />
        </IconSwitch>
      );

      expect(screen.getByRole('tab')).toHaveClass('custom-class');
    });

    it('should respect disabled prop', () => {
      const onClick = jest.fn();
      render(
        <IconSwitch text="Workspace" disabled onClick={onClick}>
          <Workspace />
        </IconSwitch>
      );

      expect(screen.getByRole('tab')).toBeDisabled();

      userEvent.click(screen.getByRole('tab'));

      expect(onClick).not.toHaveBeenCalled();
    });

    it('should call onClick when expected', () => {
      const onClick = jest.fn();
      render(
        <IconSwitch text="Workspace" onClick={onClick}>
          <Workspace />
        </IconSwitch>
      );

      userEvent.click(screen.getByRole('tab'));

      expect(onClick).toHaveBeenCalled();
    });

    it('should call onKeyDown when expected', () => {
      const onKeyDown = jest.fn();
      render(
        <IconSwitch text="Workspace" onKeyDown={onKeyDown}>
          <Workspace />
        </IconSwitch>
      );

      userEvent.type(screen.getByRole('tab'), 'enter');

      expect(onKeyDown).toHaveBeenCalled();
    });

    it('should respect selected prop', () => {
      render(
        <IconSwitch text="Workspace" selected>
          <Workspace />
        </IconSwitch>
      );

      expect(screen.getByRole('tab')).toHaveClass(
        'cds--content-switcher--selected'
      );
      expect(screen.getByRole('tab')).toHaveAttribute('aria-selected', 'true');
    });

    it('should respect text prop', () => {
      render(
        <IconSwitch text="Workspace" selected>
          <Workspace />
        </IconSwitch>
      );

      expect(screen.getByText('Workspace')).toBeInTheDocument();
    });

    it('should respect align prop', () => {
      const { container } = render(
        <IconSwitch text="Workspace" align="bottom">
          <Workspace />
        </IconSwitch>
      );

      expect(
        container.querySelector(`.${prefix}--popover-container`)
      ).toHaveClass(`${prefix}--popover--bottom`);
    });
  });
});
