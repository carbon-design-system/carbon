/**
 * Copyright IBM Corp. 2023, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { createRef, useRef, useState } from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Dialog,
  DialogBody,
  DialogCloseButton,
  DialogControls,
  DialogFooter,
  DialogHeader,
  DialogSubtitle,
  DialogTitle,
} from './Dialog';

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

    it('should support `onRequestClose` from backdrop click in modal mode', async () => {
      const user = userEvent.setup();
      const onRequestClose = jest.fn();
      const onClick = jest.fn();
      render(
        <Dialog open modal onClick={onClick} onRequestClose={onRequestClose}>
          <p>inside</p>
        </Dialog>
      );

      const dialog = screen.getByRole('dialog');
      await user.click(dialog);
      await user.click(screen.getByText('inside'));

      expect(onRequestClose).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledTimes(2);
    });

    it('should support `DialogHeader`, `DialogControls`, `DialogTitle`, and `DialogSubtitle` in context', () => {
      const { container } = render(
        <Dialog open>
          <DialogHeader data-testid="header">
            <DialogControls data-testid="controls">
              <DialogCloseButton />
            </DialogControls>
            <DialogSubtitle className="subtitle-class">Subtitle</DialogSubtitle>
            <DialogTitle className="title-class">Title</DialogTitle>
          </DialogHeader>
        </Dialog>
      );

      const dialog = screen.getByRole('dialog');
      const title = screen.getByText('Title');
      const subtitle = screen.getByText('Subtitle');

      expect(screen.getByTestId('header')).toHaveClass(
        `${prefix}--dialog__header`
      );
      expect(screen.getByTestId('controls')).toHaveClass(
        `${prefix}--dialog__header-controls`
      );
      expect(title).toHaveClass(`${prefix}--dialog-header__heading`);
      expect(subtitle).toHaveClass(`${prefix}--dialog-header__label`);
      expect(dialog).toHaveAttribute(
        'aria-labelledby',
        title.getAttribute('id')
      );
      expect(
        container.querySelector(`.${prefix}--dialog__close`)
      ).toBeInTheDocument();
    });

    it('should support custom `id`s for `DialogTitle` and `DialogSubtitle`', () => {
      render(
        <Dialog open>
          <DialogTitle id="custom-title">Custom title</DialogTitle>
          <DialogSubtitle id="custom-subtitle">Custom subtitle</DialogSubtitle>
        </Dialog>
      );

      expect(screen.getByText('Custom title')).toHaveAttribute(
        'id',
        'custom-title'
      );
      expect(screen.getByText('Custom subtitle')).toHaveAttribute(
        'id',
        'custom-subtitle'
      );
    });

    it('should support `DialogBody` scrolling content props', () => {
      render(
        <Dialog open>
          <DialogBody
            hasScrollingContent
            className="body-class"
            data-testid="body">
            Body
          </DialogBody>
        </Dialog>
      );

      const body = screen.getByTestId('body');
      expect(body).toHaveClass(`${prefix}--dialog-content`);
      expect(body).toHaveClass(`${prefix}--dialog-scroll-content`);
      expect(body).toHaveAttribute('role', 'region');
      expect(body).toHaveAttribute('tabindex', '0');
    });

    it('should support `DialogBody` resize based scroll detection and function refs', () => {
      jest.useFakeTimers();

      const bodyRef = jest.fn();

      render(
        <Dialog open>
          <DialogBody ref={bodyRef} data-testid="body">
            Body
          </DialogBody>
        </Dialog>
      );

      const body = screen.getByTestId('body');

      Object.defineProperty(body, 'clientHeight', {
        configurable: true,
        value: 10,
      });
      Object.defineProperty(body, 'scrollHeight', {
        configurable: true,
        value: 20,
      });

      act(() => {
        window.dispatchEvent(new Event('resize'));
        jest.advanceTimersByTime(250);
      });

      expect(body).toHaveClass(`${prefix}--dialog-scroll-content`);
      expect(bodyRef).toHaveBeenCalledWith(body);

      jest.useRealTimers();
    });

    it('should support `DialogBody` object refs', () => {
      const bodyRef = createRef();

      render(
        <Dialog open>
          <DialogBody ref={bodyRef} data-testid="body">
            Body
          </DialogBody>
        </Dialog>
      );

      expect(bodyRef.current).toBe(screen.getByTestId('body'));
    });

    it('should support `DialogFooter` children', () => {
      render(
        <Dialog open>
          <DialogFooter>
            <button type="button">Custom action</button>
          </DialogFooter>
        </Dialog>
      );

      expect(
        screen.getByRole('button', { name: 'Custom action' })
      ).toBeVisible();
      expect(
        screen.queryByRole('button', { name: 'Save' })
      ).not.toBeInTheDocument();
    });

    it('should support `DialogFooter` secondary buttons array and primary submit', async () => {
      const user = userEvent.setup();
      const first = jest.fn();
      const second = jest.fn();
      const onRequestSubmit = jest.fn();

      render(
        <Dialog open>
          <DialogFooter
            secondaryButtons={[
              { buttonText: 'One', onClick: first },
              { buttonText: 'Two', onClick: second },
            ]}
            onRequestSubmit={onRequestSubmit}
          />
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: 'One' }));
      await user.click(screen.getByRole('button', { name: 'Two' }));
      await user.click(screen.getByRole('button', { name: 'Save' }));

      expect(first).toHaveBeenCalledTimes(1);
      expect(second).toHaveBeenCalledTimes(1);
      expect(onRequestSubmit).toHaveBeenCalledTimes(1);
    });

    it('should support `DialogFooter` secondary button fallback and override handler', async () => {
      const user = userEvent.setup();
      const onRequestClose = jest.fn();
      const onSecondarySubmit = jest.fn();

      render(
        <Dialog open>
          <DialogFooter
            secondaryButtonText="Back"
            onRequestClose={onRequestClose}
            onSecondarySubmit={onSecondarySubmit}
          />
        </Dialog>
      );

      await user.click(screen.getByRole('button', { name: 'Back' }));

      expect(onSecondarySubmit).toHaveBeenCalledTimes(1);
      expect(onRequestClose).not.toHaveBeenCalled();
    });

    it('should support `DialogFooter` loading state', () => {
      render(
        <Dialog open>
          <DialogFooter
            loadingStatus="active"
            loadingDescription="Saving"
            loadingIconDescription="Saving icon"
          />
        </Dialog>
      );

      const primaryButton = screen.getByRole('button', { name: /Saving/ });
      const secondaryButton = screen.getByRole('button', { name: 'Cancel' });

      expect(primaryButton).toBeDisabled();
      expect(primaryButton).toHaveClass(`${prefix}--btn--loading`);
      expect(secondaryButton).toBeDisabled();
    });

    it('should support `DialogFooter` `danger` focus behavior', async () => {
      const raf = jest
        .spyOn(window, 'requestAnimationFrame')
        .mockImplementation((callback) => {
          callback(0);
          return 1;
        });
      const caf = jest
        .spyOn(window, 'cancelAnimationFrame')
        .mockImplementation(() => {});

      render(
        <Dialog open>
          <DialogFooter danger secondaryButtonText="Cancel action" />
        </Dialog>
      );

      const secondaryButton = screen.getByRole('button', {
        name: 'Cancel action',
      });

      await waitFor(() => {
        expect(secondaryButton).toHaveFocus();
      });

      raf.mockRestore();
      caf.mockRestore();
    });
  });

  it('should bring focusAfterCloseRef element into focus on close when the ref is defined', async () => {
    const DialogExample = () => {
      const [open, setOpen] = useState(true);
      const focusRef = useRef();
      return (
        <>
          <Dialog
            open={open}
            focusAfterCloseRef={focusRef}
            onClose={() => setOpen(false)}>
            <DialogCloseButton
              data-testid="close"
              onClick={() => setOpen(false)}
            />
          </Dialog>
          <button data-testid="focusElem" ref={focusRef}>
            focus after close
          </button>
        </>
      );
    };
    render(<DialogExample />);

    const closeButton = screen.getByTestId('close');
    const focusElem = screen.getByTestId('focusElem');

    expect(focusElem).not.toHaveFocus();
    await userEvent.click(closeButton);
    await waitFor(() => {
      expect(focusElem).toHaveFocus();
    });
  });
});
