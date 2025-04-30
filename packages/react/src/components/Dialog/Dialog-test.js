/**
 * Copyright IBM Corp. 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { unstable__Dialog as Dialog } from './';

const prefix = 'cds';

describe('Dialog', () => {
  describe('renders as expected - Component API', () => {
    it('supports a ref on the outermost element', () => {
      const ref = jest.fn();
      const { container } = render(<Dialog ref={ref} />);
      expect(ref).toHaveBeenCalledWith(container.firstChild);
    });

    it('supports a custom class name on the outermost element', () => {
      const { container } = render(<Dialog className="test" />);
      expect(container.firstChild).toHaveClass('test');
    });

    it('forwards additional props on the outermost element', () => {
      const { container } = render(<Dialog data-testid="test" />);
      expect(container.firstChild).toHaveAttribute('data-testid', 'test');
    });

    it('supports modal', () => {
      const { container } = render(<Dialog modal />);
      expect(container.firstChild).toHaveClass(`${prefix}--dialog--modal`);
    });

    it('supports non-modal', () => {
      const { container } = render(<Dialog />);
      expect(container.firstChild).not.toHaveClass(`${prefix}--dialog--modal`);
    });

    it('supports open prop', () => {
      render(<Dialog open />);
      expect(screen.getByRole('dialog').open).toBe(true);
    });

    it('is not open by default', () => {
      render(<Dialog />);
      expect(screen.getByRole('dialog', { hidden: true }).open).toBe(false);
    });

    it('supports children prop', () => {
      render(
        <Dialog open>
          <p>Test children</p>
        </Dialog>
      );
      expect(screen.getByText('Test children')).toBeInTheDocument();
      expect(screen.getByText('Test children')).toBeVisible();
    });

    it('supports onClick prop', async () => {
      const user = userEvent.setup();
      const onClick = jest.fn();
      render(
        <Dialog open onClick={onClick}>
          <p>Test children</p>
        </Dialog>
      );

      await user.click(screen.getByText('Test children'));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    // TODO: Move this to e2e/components/Dialog/Dialog-test.e2e.js once it exists
    // --
    // jsdom doesn't implement HTMLDialogElement: https://github.com/jsdom/jsdom/issues/3294
    // All browser-based portions of the api will need to be tested in an actual browser.
    it.skip('supports onCancel prop', async () => {
      const user = userEvent.setup();
      const onCancel = jest.fn();
      render(<Dialog open onCancel={onCancel} />);

      // onCancel is fired when the dialog is closed by the escape key
      await user.keyboard('[Escape]');

      expect(onCancel).toHaveBeenCalledTimes(1);
    });

    // TODO: Move this to e2e/components/Dialog/Dialog-test.e2e.js once it exists
    // --
    // jsdom doesn't implement HTMLDialogElement: https://github.com/jsdom/jsdom/issues/3294
    // All browser-based portions of the api will need to be tested in an actual browser.
    it.skip('supports onClose prop', async () => {
      const user = userEvent.setup();
      const onClose = jest.fn();
      render(<Dialog open onClose={onClose} />);

      // close the dialog via escape or click on close button

      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
