/**
 * Copyright IBM Corp. 2016, 2018
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

    it('calls onClose when close button is clicked', () => {
      const onClose = jest.fn();
      render(
        <ComposedModal open onClose={onClose}>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>This is the modal body content</ModalBody>
        </ComposedModal>
      );

      userEvent.click(screen.getByTitle('Close'));

      expect(onClose).toHaveBeenCalled();
    });

    it('should not close when onClose returns false', () => {
      const onClose = () => false;
      render(
        <ComposedModal open onClose={onClose}>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>This is the modal body content</ModalBody>
        </ComposedModal>
      );

      userEvent.click(screen.getByTitle('Close'));

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

    it('should prevent close on click outside', () => {
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

      userEvent.click(screen.getByText('Click me'));

      expect(screen.getByRole('presentation', { hidden: true })).toHaveClass(
        'is-visible'
      );
    });

    it('should focus selector on open', () => {
      const ComposedModalExample = () => {
        const [isOpen, setIsOpen] = React.useState(false);
        return (
          <>
            <button
              type="button"
              onClick={() => {
                setIsOpen(!isOpen);
              }}>
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
      };

      render(<ComposedModalExample />);

      userEvent.click(screen.getByText('Click me'), { clickCount: 3 });
      expect(screen.getByRole('presentation', { hidden: true })).toHaveClass(
        'is-visible'
      );

      expect(screen.getByTestId('test-id-1')).toHaveFocus();
    });

    it('should change size based on size prop', () => {
      render(
        <ComposedModal open size="lg">
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>This is the modal body content</ModalBody>
        </ComposedModal>
      );

      expect(screen.getByRole('dialog', { hidden: true })).toHaveClass(
        'cds--modal-container--lg'
      );
    });
  });
});
