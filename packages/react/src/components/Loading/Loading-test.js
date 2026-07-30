/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Loading from './Loading';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Loading', () => {
  describe('renders as expected - Component API', () => {
    it('should change classes based on active', () => {
      const { container, rerender } = render(<Loading active />);
      const overlay = container.firstChild;

      expect(overlay).not.toHaveClass('cds--loading-overlay--stop');

      rerender(<Loading active={false} />);

      expect(overlay).toHaveClass('cds--loading-overlay--stop');
    });

    it('should support a custom `className` prop on the loading element', () => {
      const { container } = render(
        <Loading className="custom-class" withOverlay={false} />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });

    it('should spread extra props on the loading element when withOverlay is false', () => {
      const { container } = render(
        <Loading withOverlay={false} data-testid="test" />
      );

      expect(container.firstChild).toHaveAttribute('data-testid', 'test');
    });

    it('should specify a description based on prop', () => {
      render(<Loading description="Loading description" />);

      expect(screen.getByTitle('Loading description')).toBeInTheDocument();
    });

    it('should respect small prop', () => {
      const { container } = render(<Loading small withOverlay={false} />);

      expect(container.firstChild).toHaveClass('cds--loading--small');
    });

    it('should respect withOverlay prop', () => {
      const { container, rerender } = render(<Loading withOverlay />);

      expect(container.firstChild).toHaveClass('cds--loading-overlay');

      rerender(<Loading withOverlay={false} />);

      expect(container.firstChild).not.toHaveClass('cds--loading-overlay');
    });

    it('should render presentation wrapper and dialog when withOverlay is true', () => {
      render(<Loading withOverlay />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-modal', 'true');
      expect(screen.getByRole('presentation')).toContainElement(dialog);
    });

    it('should not render overlay wrapper when withOverlay is false', () => {
      const { container } = render(<Loading withOverlay={false} />);

      expect(container.firstChild).toHaveClass('cds--loading');
      expect(container.firstChild).not.toHaveAttribute('role', 'presentation');
    });
  });

  describe('with a screenreader', () => {
    // https://www.w3.org/TR/WCAG21/#headings-and-labels
    it('should have a live region on the loading element', () => {
      render(<Loading data-testid="live-region" />);

      const liveRegion = screen.getByTestId('live-region');
      expect(liveRegion).toHaveAttribute('aria-live');
      expect(liveRegion).toHaveClass('cds--loading');
    });

    // https://www.w3.org/TR/WCAG21/#status-messages
    it('should announce a loading status when active', () => {
      render(<Loading active data-testid="live-region" />);

      const liveRegion = screen.getByTestId('live-region');
      expect(liveRegion).toHaveAttribute('aria-atomic', 'true');
      expect(liveRegion).toHaveAttribute('aria-live', 'assertive');
    });

    it('should set aria-live to off when not active', () => {
      render(<Loading active={false} data-testid="live-region" />);

      expect(screen.getByTestId('live-region')).toHaveAttribute(
        'aria-live',
        'off'
      );
    });

    it('should set aria-label on dialog when withOverlay is true', () => {
      render(<Loading withOverlay description="Loading content" />);

      const dialog = screen.getByRole('dialog');
      expect(dialog).toHaveAttribute('aria-label', 'Loading content');
    });
  });

  describe('focus trap', () => {
    it('should prevent Tab from moving focus outside overlay', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <button data-testid="before">Before</button>
          <Loading withOverlay active />
          <button data-testid="after">After</button>
        </div>
      );

      const dialog = screen.getByRole('dialog');

      await waitFor(() => {
        expect(document.activeElement).toBe(dialog);
      });

      await user.tab();
      expect(document.activeElement).toBe(dialog);

      await user.tab({ shift: true });
      expect(document.activeElement).toBe(dialog);
    });

    it('should swallow Tab when the keydown carries no element target', async () => {
      render(<Loading withOverlay active />);

      await waitFor(() => {
        expect(document.activeElement).toBe(screen.getByRole('dialog'));
      });

      expect(fireEvent.keyDown(document, { key: 'Tab' })).toBe(false);
      expect(document.activeElement).toBe(screen.getByRole('dialog'));
    });

    it('should return focus to the dialog when a background control is focused programmatically', async () => {
      render(
        <div>
          <button data-testid="before">Before</button>
          <Loading withOverlay active />
          <button data-testid="after">After</button>
        </div>
      );

      const dialog = screen.getByRole('dialog');

      await waitFor(() => {
        expect(document.activeElement).toBe(dialog);
      });

      screen.getByTestId('after').focus();
      expect(document.activeElement).toBe(dialog);

      screen.getByTestId('before').focus();
      expect(document.activeElement).toBe(dialog);
    });

    it('should return focus to the dialog after a background control is clicked', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <Loading withOverlay active />
          <button data-testid="after">After</button>
        </div>
      );

      const dialog = screen.getByRole('dialog');

      await waitFor(() => {
        expect(document.activeElement).toBe(dialog);
      });

      await user.click(screen.getByTestId('after'));
      expect(document.activeElement).toBe(dialog);
    });

    it('should not steal focus from a modal layered on top of the overlay', async () => {
      render(
        <div>
          <Loading withOverlay active />
          <div role="dialog" aria-modal="true" aria-label="Layered modal">
            <button data-testid="modal-button">Confirm</button>
          </div>
        </div>
      );

      const overlayDialog = screen.getByRole('dialog', { name: 'loading' });

      await waitFor(() => {
        expect(document.activeElement).toBe(overlayDialog);
      });

      const modalButton = screen.getByTestId('modal-button');
      modalButton.focus();

      expect(document.activeElement).toBe(modalButton);
    });

    it('should not claim focus when mounted under an already open modal', () => {
      render(
        <div role="dialog" aria-modal="true" aria-label="Layered modal">
          <button data-testid="modal-button">Confirm</button>
        </div>
      );

      const modalButton = screen.getByTestId('modal-button');
      modalButton.focus();
      expect(document.activeElement).toBe(modalButton);

      render(<Loading withOverlay active />);

      expect(
        screen.getByRole('dialog', { name: 'loading' })
      ).toBeInTheDocument();
      expect(document.activeElement).toBe(modalButton);
    });

    const stubModalSelector = (element, isModal) => {
      const { matches } = element;
      element.matches = (selector) =>
        selector === ':modal' ? isModal : matches.call(element, selector);
    };

    const renderWithNativeDialog = async () => {
      render(
        <div>
          <Loading withOverlay active />
          {/* `getByRole` skips a closed `<dialog>`, hence the test id. */}
          <dialog data-testid="native-dialog" aria-label="Native dialog">
            <button data-testid="native-button">Confirm</button>
          </dialog>
        </div>
      );

      await waitFor(() => {
        expect(document.activeElement).toBe(
          screen.getByRole('dialog', { name: 'loading' })
        );
      });

      return screen.getByTestId('native-dialog');
    };

    it('should not steal focus from a native dialog layered on top', async () => {
      const nativeDialog = await renderWithNativeDialog();

      nativeDialog.showModal();
      stubModalSelector(nativeDialog, true);

      const nativeButton = screen.getByTestId('native-button');
      nativeButton.focus();

      expect(document.activeElement).toBe(nativeButton);
    });

    it('should keep trapping focus against a modeless native dialog', async () => {
      const nativeDialog = await renderWithNativeDialog();

      nativeDialog.show();
      stubModalSelector(nativeDialog, false);

      screen.getByTestId('native-button').focus();

      expect(document.activeElement).toBe(
        screen.getByRole('dialog', { name: 'loading' })
      );
    });

    it('should assume a native dialog is modal when the engine lacks `:modal`', async () => {
      const nativeDialog = await renderWithNativeDialog();

      nativeDialog.showModal();

      const nativeButton = screen.getByTestId('native-button');
      nativeButton.focus();

      expect(document.activeElement).toBe(nativeButton);
    });

    it('should keep trapping focus when rendered inside a modal', async () => {
      render(
        <div role="dialog" aria-modal="true" aria-label="Enclosing modal">
          <button data-testid="modal-button">Confirm</button>
          <Loading withOverlay active />
        </div>
      );

      const overlayDialog = screen.getByRole('dialog', { name: 'loading' });

      await waitFor(() => {
        expect(document.activeElement).toBe(overlayDialog);
      });

      screen.getByTestId('modal-button').focus();

      expect(document.activeElement).toBe(overlayDialog);
    });

    it('should not swallow Tab inside a modal layered on top of the overlay', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <Loading withOverlay active />
          <div role="dialog" aria-modal="true" aria-label="Layered modal">
            <button data-testid="modal-cancel">Cancel</button>
            <button data-testid="modal-confirm">Confirm</button>
          </div>
        </div>
      );

      await waitFor(() => {
        expect(document.activeElement).toBe(
          screen.getByRole('dialog', { name: 'loading' })
        );
      });

      screen.getByTestId('modal-cancel').focus();

      await user.tab();
      expect(document.activeElement).toBe(screen.getByTestId('modal-confirm'));
    });

    it('should settle focus when two overlays are active at once', async () => {
      const user = userEvent.setup();

      render(
        <div>
          <Loading withOverlay active description="first" />
          <Loading withOverlay active description="second" />
        </div>
      );

      const first = screen.getByRole('dialog', { name: 'first' });

      await waitFor(() => {
        expect(document.activeElement).toBe(first);
      });

      await user.tab();
      expect(document.activeElement).toBe(first);
    });

    it('should restore focus when overlay deactivates', () => {
      const { rerender } = render(
        <div>
          <button data-testid="trigger">Trigger</button>
          <Loading withOverlay active={false} />
        </div>
      );

      const trigger = screen.getByTestId('trigger');
      trigger.focus();

      rerender(
        <div>
          <button data-testid="trigger">Trigger</button>
          <Loading withOverlay active />
        </div>
      );

      rerender(
        <div>
          <button data-testid="trigger">Trigger</button>
          <Loading withOverlay active={false} />
        </div>
      );

      expect(document.activeElement).toBe(trigger);
    });

    it('should restore focus when the overlay unmounts', () => {
      const { rerender } = render(
        <div>
          <button data-testid="trigger">Trigger</button>
        </div>
      );

      const trigger = screen.getByTestId('trigger');
      trigger.focus();

      rerender(
        <div>
          <button data-testid="trigger">Trigger</button>
          <Loading withOverlay active />
        </div>
      );

      expect(document.activeElement).toBe(screen.getByRole('dialog'));

      rerender(
        <div>
          <button data-testid="trigger">Trigger</button>
        </div>
      );

      expect(document.activeElement).toBe(trigger);
    });

    it('should not restore focus to a non-HTML element', () => {
      const withGlyph = (loader) => (
        <div>
          <svg data-testid="glyph" tabIndex={-1} />
          {loader}
        </div>
      );

      const { rerender } = render(withGlyph(null));

      const glyph = screen.getByTestId('glyph');
      glyph.focus();
      expect(document.activeElement).toBe(glyph);

      rerender(withGlyph(<Loading withOverlay active />));
      expect(document.activeElement).toBe(
        screen.getByRole('dialog', { name: 'loading' })
      );

      rerender(withGlyph(null));

      expect(document.activeElement).toBe(document.body);
    });

    it('should restore focus next to the trigger when the trigger is disabled', () => {
      const withForm = (loader, disabled) => (
        <div data-testid="form">
          <button data-testid="trigger" disabled={disabled}>
            Submit
          </button>
          {loader}
        </div>
      );

      const { rerender } = render(withForm(null, false));

      screen.getByTestId('trigger').focus();

      rerender(withForm(<Loading withOverlay active />, false));
      expect(document.activeElement).toBe(
        screen.getByRole('dialog', { name: 'loading' })
      );

      rerender(withForm(null, true));

      const formElement = screen.getByTestId('form');
      expect(document.activeElement).toBe(formElement);
      expect(formElement).toHaveAttribute('tabindex', '-1');

      screen.getByTestId('trigger').removeAttribute('disabled');
      screen.getByTestId('trigger').focus();
      expect(formElement).not.toHaveAttribute('tabindex');
    });

    it('should keep a tabindex the fallback already owned', () => {
      const withForm = (loader, disabled) => (
        <div data-testid="form" tabIndex={-1}>
          <button data-testid="trigger" disabled={disabled}>
            Submit
          </button>
          {loader}
        </div>
      );

      const { rerender } = render(withForm(null, false));

      screen.getByTestId('trigger').focus();

      rerender(withForm(<Loading withOverlay active />, false));
      rerender(withForm(null, true));

      const formElement = screen.getByTestId('form');
      expect(document.activeElement).toBe(formElement);

      screen.getByTestId('trigger').removeAttribute('disabled');
      screen.getByTestId('trigger').focus();

      expect(formElement).toHaveAttribute('tabindex', '-1');
    });

    it('should drop the borrowed tabindex when the fallback cannot keep focus', () => {
      const withForm = (loader, disabled) => (
        <div>
          <div data-testid="form">
            <button data-testid="trigger" disabled={disabled}>
              Submit
            </button>
          </div>
          <button data-testid="rival">Rival</button>
          {loader}
        </div>
      );

      const { rerender } = render(withForm(null, false));

      screen.getByTestId('trigger').focus();

      rerender(withForm(<Loading withOverlay active />, false));

      const rival = screen.getByTestId('rival');
      const steal = (event) => {
        if (event.target !== rival) {
          rival.focus();
        }
      };
      document.addEventListener('focusin', steal, true);

      try {
        rerender(withForm(null, true));
      } finally {
        document.removeEventListener('focusin', steal, true);
      }

      expect(document.activeElement).toBe(rival);
      expect(screen.getByTestId('form')).not.toHaveAttribute('tabindex');
    });

    const withLayeredModal = (loader) => (
      <div>
        <div role="dialog" aria-modal="true" aria-label="Layered modal">
          <button data-testid="modal-button">Confirm</button>
        </div>
        <button data-testid="trigger">Trigger</button>
        {loader}
      </div>
    );

    it('should leave focus in a layered modal when the overlay unmounts', () => {
      const { rerender } = render(withLayeredModal(null));

      screen.getByTestId('trigger').focus();

      rerender(withLayeredModal(<Loading withOverlay active />));

      const modalButton = screen.getByTestId('modal-button');
      modalButton.focus();
      expect(document.activeElement).toBe(modalButton);

      rerender(withLayeredModal(null));

      expect(document.activeElement).toBe(modalButton);
    });

    it('should leave focus in a layered modal when the overlay deactivates', () => {
      const { rerender } = render(
        withLayeredModal(<Loading withOverlay active={false} />)
      );

      screen.getByTestId('trigger').focus();

      rerender(withLayeredModal(<Loading withOverlay active />));

      const modalButton = screen.getByTestId('modal-button');
      modalButton.focus();
      expect(document.activeElement).toBe(modalButton);

      rerender(withLayeredModal(<Loading withOverlay active={false} />));

      expect(document.activeElement).toBe(modalButton);
    });

    it('should stop reclaiming focus when a competing trap fights back', async () => {
      render(
        <div>
          <Loading withOverlay active />
          <button data-testid="competitor">Competitor</button>
        </div>
      );

      const dialog = screen.getByRole('dialog');

      await waitFor(() => {
        expect(document.activeElement).toBe(dialog);
      });

      const competitor = screen.getByTestId('competitor');
      const fightBack = () => competitor.focus();
      competitor.addEventListener('focusout', fightBack);

      let overlayFocusCount = 0;
      const countOverlayFocus = () => {
        overlayFocusCount++;
      };
      dialog.addEventListener('focusin', countOverlayFocus);

      try {
        competitor.focus();
      } finally {
        competitor.removeEventListener('focusout', fightBack);
        dialog.removeEventListener('focusin', countOverlayFocus);
      }

      expect(overlayFocusCount).toBeGreaterThan(0);
      expect(overlayFocusCount).toBeLessThan(20);
    });

    it('should not trap focus when withOverlay is false', () => {
      render(
        <div>
          <Loading withOverlay={false} active />
          <button data-testid="after">After</button>
        </div>
      );

      const after = screen.getByTestId('after');
      after.focus();

      expect(document.activeElement).toBe(after);
    });
  });
});
