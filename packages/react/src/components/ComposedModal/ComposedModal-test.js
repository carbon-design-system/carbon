/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable jsx-a11y/label-has-associated-control */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ComposedModal, { ModalBody } from './ComposedModal';
import { ModalHeader } from './ModalHeader';
import { ModalFooter } from './ModalFooter';
import { TextInput } from '../../';
import { Slug } from '../Slug';

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

      await userEvent.click(screen.getByTitle('Close'));

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

      await userEvent.click(screen.getByTitle('Close'));

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

    it('should respect slug prop', () => {
      const { container } = render(
        <ComposedModal open slug={<Slug />}>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>This is the modal body content</ModalBody>
          <ModalFooter
            primaryButtonText="Add"
            secondaryButtonText="Cancel"
            loadingStatus="active"
            loadingDescription="loading..."></ModalFooter>
        </ComposedModal>
      );

      expect(container.firstChild).toHaveClass(`${prefix}--modal--slug`);
    });
  });
});
