/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useRef, useState } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ComposedModal, { ModalBody } from './ComposedModal';
import { FeatureFlags } from '../FeatureFlags';
import { ModalHeader } from './ModalHeader';
import { ModalFooter } from './ModalFooter';
import { TextInput } from '../../';
import { AILabel } from '../AILabel';

const prefix = 'cds';

describe('ComposedModal', () => {
  describe('it renders as expected', () => {
    it('supports a custom class on the outermost div', () => {
      render(<ComposedModal className="custom-class" />);

      expect(screen.getByRole('presentation', { hidden: true })).toHaveClass(
        'custom-class'
      );
    });

    it('supports a custom class on the container div', () => {
      render(<ComposedModal containerClassName="custom-class" />);

      expect(screen.getByRole('dialog', { hidden: true })).toHaveClass(
        'custom-class'
      );
    });

    it('supports a custom class on the modal body', () => {
      render(
        <ComposedModal>
          <ModalBody className="custom-class" data-testid="modal-body" />
        </ComposedModal>
      );

      expect(screen.getByTestId('modal-body')).toHaveClass('custom-class');
    });

    it('should spread props onto the outermost div', () => {
      render(<ComposedModal data-testid="modal" />);

      expect(
        screen.getByRole('presentation', { hidden: true })
      ).toHaveAttribute('data-testid', 'modal');
    });

    it('should be labelled by a provided aria-label', () => {
      render(<ComposedModal aria-label="modal" />);

      expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute(
        'aria-label',
        'modal'
      );
    });

    it('should be labelled by a provided aria-labelledby', () => {
      render(
        <div>
          <label id="label-modal-id">Label for modal</label>
          <ComposedModal aria-labelledby="label-modal-id">
            <ModalHeader>Modal header</ModalHeader>
            <ModalBody>This is the modal body content</ModalBody>
            <ModalFooter primaryButtonText="Add" secondaryButtonText="Cancel" />
          </ComposedModal>
        </div>
      );

      expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute(
        'aria-labelledby',
        'label-modal-id'
      );
    });

    it('should change submit to danger button', () => {
      render(
        <ComposedModal danger open>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>This is the modal body content</ModalBody>
          <ModalFooter
            danger
            primaryButtonText="Add"
            secondaryButtonText="Cancel"
          />
        </ComposedModal>
      );

      expect(screen.getByRole('presentation', { hidden: true })).toHaveClass(
        'cds--modal--danger'
      );
    });

    it('calls onClose when close button is clicked', async () => {
      const onClose = jest.fn();
      render(
        <ComposedModal open onClose={onClose}>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>This is the modal body content</ModalBody>
        </ComposedModal>
      );

      await userEvent.click(screen.getByLabelText('Close'));

      expect(onClose).toHaveBeenCalled();
    });

    it('should not close when onClose returns false', async () => {
      const onClose = () => false;
      render(
        <ComposedModal open onClose={onClose}>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>This is the modal body content</ModalBody>
        </ComposedModal>
      );

      await userEvent.click(screen.getByLabelText('Close'));

      expect(screen.getByRole('presentation', { hidden: true })).toHaveClass(
        'is-visible'
      );
    });

    it('should be open if specified', () => {
      render(
        <ComposedModal open>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>This is the modal body content</ModalBody>
        </ComposedModal>
      );

      expect(screen.getByText('Modal header')).toBeInTheDocument();
      expect(screen.getByRole('presentation', { hidden: true })).toHaveClass(
        'is-visible'
      );
    });

    it('should prevent close on click outside', async () => {
      render(
        <>
          <button type="button">Click me</button>
          <ComposedModal open preventCloseOnClickOutside>
            <ModalHeader>Modal header</ModalHeader>
            <ModalBody>This is the modal body content</ModalBody>
          </ComposedModal>
        </>
      );
      expect(screen.getByRole('presentation', { hidden: true })).toHaveClass(
        'is-visible'
      );

      await userEvent.click(screen.getByText('Click me'));

      expect(screen.getByRole('presentation', { hidden: true })).toHaveClass(
        'is-visible'
      );
    });

    it('should focus selector on open', async () => {
      function ComposedModalExample() {
        const [isOpen, setIsOpen] = React.useState(false);
        return (
          <>
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              Click me
            </button>
            <ComposedModal
              open={isOpen}
              preventCloseOnClickOutside
              selectorPrimaryFocus="#text-input-1">
              <ModalHeader>Modal header</ModalHeader>
              <ModalBody>
                This is the modal body content
                <TextInput
                  id="text-input-1"
                  data-testid="test-id-1"
                  labelText="text input"
                />
              </ModalBody>
            </ComposedModal>
          </>
        );
      }
      render(<ComposedModalExample />);

      await userEvent.click(screen.getByText('Click me'), { clickCount: 3 });

      const elementModal = screen.getByRole('presentation', { hidden: true });
      expect(elementModal).toHaveClass('is-visible');

      const elementInput = screen.getByTestId('test-id-1');
      expect(elementInput).toHaveFocus();
    });

    it('should focus on the primary button', async () => {
      function ComposedModalExample() {
        const [isOpen, setIsOpen] = React.useState(false);
        return (
          <>
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              Click me
            </button>
            <ComposedModal open={isOpen} preventCloseOnClickOutside>
              <ModalHeader>Modal header</ModalHeader>
              <ModalBody>
                This is the modal body content
                <TextInput
                  id="text-input-1"
                  data-testid="test-id-1"
                  labelText="text input"
                />
              </ModalBody>
              <ModalFooter
                primaryButtonText="Add"
                secondaryButtonText="Cancel"
              />
            </ComposedModal>
          </>
        );
      }
      render(<ComposedModalExample />);

      await userEvent.click(screen.getByText('Click me'));

      const elementModal = screen.getByRole('presentation', { hidden: true });
      expect(elementModal).toHaveClass('is-visible');

      const elementInput = screen.getByRole('button', { name: 'Add' });
      expect(elementInput).toHaveFocus();
    });

    it('should focus on the secondary button if danger is true', async () => {
      function ComposedModalExample() {
        const [isOpen, setIsOpen] = React.useState(false);
        return (
          <>
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              Click me
            </button>
            <ComposedModal
              danger
              selectorPrimaryFocus="#text-input-1"
              open={isOpen}
              preventCloseOnClickOutside>
              <ModalHeader>Modal header</ModalHeader>
              <ModalBody>
                This is the modal body content
                <TextInput
                  id="text-input-1"
                  data-testid="test-id-1"
                  labelText="text input"
                />
              </ModalBody>
              <ModalFooter
                primaryButtonText="Add"
                secondaryButtonText="Cancel"
              />
            </ComposedModal>
          </>
        );
      }
      render(<ComposedModalExample />);

      await userEvent.click(screen.getByText('Click me'));

      const elementModal = screen.getByRole('presentation', { hidden: true });
      expect(elementModal).toHaveClass('is-visible');

      const elementInput = screen.getByRole('button', { name: 'Cancel' });
      expect(elementInput).toHaveFocus();
    });

    it('should focus on the close button if there is no focusable element', async () => {
      function ComposedModalExample() {
        const [isOpen, setIsOpen] = React.useState(false);
        return (
          <>
            <button type="button" onClick={() => setIsOpen(!isOpen)}>
              Click me
            </button>
            <ComposedModal open={isOpen} preventCloseOnClickOutside>
              <ModalHeader>Modal header</ModalHeader>
              <ModalBody>
                This is the modal body content
                <TextInput
                  id="text-input-1"
                  data-testid="test-id-1"
                  labelText="text input"
                />
              </ModalBody>
            </ComposedModal>
          </>
        );
      }
      render(<ComposedModalExample />);

      await userEvent.click(screen.getByText('Click me'));

      const elementModal = screen.getByRole('presentation', { hidden: true });
      expect(elementModal).toHaveClass('is-visible');

      const elementInput = screen.getByRole('button', { name: 'Close' });
      expect(elementInput).toHaveFocus();
    });

    it('should change size based on size prop', () => {
      render(
        <ComposedModal open size="lg">
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>This is the modal body content</ModalBody>
        </ComposedModal>
      );

      expect(screen.getByRole('dialog', { hidden: true })).toHaveClass(
        `${prefix}--modal-container--lg`
      );
    });

    it('disables buttons when inline loading status is active', () => {
      render(
        <ComposedModal open>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>This is the modal body content</ModalBody>
          <ModalFooter
            primaryButtonText="Add"
            secondaryButtonText="Cancel"
            loadingStatus="active"
            loadingDescription="loading..."></ModalFooter>
        </ComposedModal>
      );

      expect(screen.getByTitle('loading')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'loading loading...' })
      ).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
    });

    it('should respect decorator prop', () => {
      const { container } = render(
        <ComposedModal open decorator={<AILabel />}>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>This is the modal body content</ModalBody>
          <ModalFooter
            primaryButtonText="Add"
            secondaryButtonText="Cancel"
            loadingStatus="active"
            loadingDescription="loading..."></ModalFooter>
        </ComposedModal>
      );

      expect(container.firstChild).toHaveClass(`${prefix}--modal--decorator`);
    });
  });

  describe('enable-dialog-element feature flag', () => {
    it('should bring launcherButtonRef element into focus on close when the ref is defined', async () => {
      const ComposedModalExample = () => {
        const [open, setOpen] = useState(true);
        const focusRef = useRef();
        return (
          <FeatureFlags enableDialogElement>
            <ComposedModal
              open={open}
              launcherButtonRef={focusRef}
              onClick={() => setOpen(false)}>
              <button data-testid="close" onClick={() => setOpen(false)}>
                Close
              </button>
            </ComposedModal>
            <button data-testid="focusElem" ref={focusRef}>
              focus after close
            </button>
          </FeatureFlags>
        );
      };
      render(<ComposedModalExample />);

      const closeButton = screen.getByTestId('close');
      const focusElem = screen.getByTestId('focusElem');

      expect(focusElem).not.toHaveFocus();
      await userEvent.click(closeButton);
      await waitFor(() => {
        expect(focusElem).toHaveFocus();
      });
    });
  });

  it('should respect the deprecated slug prop', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    render(
      <ComposedModal open slug={<AILabel />}>
        <ModalHeader>Modal header</ModalHeader>
        <ModalBody>This is the modal body content</ModalBody>
        <ModalFooter
          primaryButtonText="Add"
          secondaryButtonText="Cancel"
          loadingStatus="active"
          loadingDescription="loading..."></ModalFooter>
      </ComposedModal>
    );

    expect(
      screen.getByRole('button', { name: 'AI Show information' })
    ).toBeInTheDocument();
    spy.mockRestore();
  });

  it('should handle onClick events', async () => {
    const onClick = jest.fn();
    render(
      <ComposedModal open onClick={onClick}>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
      </ComposedModal>
    );
    const modal = screen.getByRole('dialog');
    await userEvent.click(modal);
    expect(onClick).toHaveBeenCalled();
  });

  it('should close when clicking outside passive composed modal', async () => {
    const onClose = jest.fn();
    render(
      <ComposedModal open onClose={onClose}>
        <ModalBody>This is the modal body content</ModalBody>
      </ComposedModal>
    );
    const backgroundLayer = screen.getByRole('presentation');
    await userEvent.click(backgroundLayer);
    expect(onClose).toHaveBeenCalled();
  });

  it('should not close when clicking outside non-passive composed modal', async () => {
    const onClose = jest.fn();
    render(
      <>
        <button data-testid="outside-button">☀️</button>
        <ComposedModal open onClose={onClose}>
          <ModalHeader>Header</ModalHeader>
          <ModalBody>Body</ModalBody>
          <ModalFooter
            primaryButtonText="Confirm"
            secondaryButtonText="Cancel"
          />
        </ComposedModal>
      </>
    );

    await userEvent.click(screen.getByTestId('outside-button'));
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should NOT close when clicked inside dialog window, dragged outside and released mouse button', async () => {
    const onClose = jest.fn();
    render(
      <ComposedModal open onClose={onClose}>
        <ModalBody data-testid="modal-body-1">
          This is the modal body content
        </ModalBody>
      </ComposedModal>
    );

    const modalBody = screen.getByTestId('modal-body-1');
    const backgroundLayer = screen.getByRole('presentation');

    fireEvent.mouseDown(modalBody, { target: modalBody });
    fireEvent.click(backgroundLayer, { target: backgroundLayer });

    expect(onClose).not.toHaveBeenCalled();
  });

  it('should focus on launcherButtonRef element on close when defined', async () => {
    const ComposedModalExample = () => {
      const [open, setOpen] = useState(true);
      const focusRef = useRef();
      return (
        <>
          <ComposedModal
            open={open}
            launcherButtonRef={focusRef}
            onClick={() => setOpen(false)}>
            <button data-testid="close" onClick={() => setOpen(false)}>
              Close
            </button>
          </ComposedModal>
          <button data-testid="focusElem" ref={focusRef}>
            focus after close
          </button>
        </>
      );
    };
    render(<ComposedModalExample />);

    const closeButton = screen.getByTestId('close');
    const focusElem = screen.getByTestId('focusElem');

    expect(focusElem).not.toHaveFocus();
    await userEvent.click(closeButton);
    await waitFor(() => {
      expect(focusElem).toHaveFocus();
    });
  });
});
