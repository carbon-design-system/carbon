import React from 'react';
import { ModalFooter } from './ModalFooter';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('ModalFooter', () => {
  it('should pass a classname to the container', () => {
    const { container } = render(<ModalFooter className="custom-class" />);

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should spread extra props onto outermost element', () => {
    const { container } = render(<ModalFooter data-testid="test" />);

    expect(container.firstChild).toHaveAttribute('data-testid', 'test');
  });

  it('should render primary button text', () => {
    render(
      <ModalFooter primaryButtonText="Submit" secondaryButtonText="Cancel" />
    );

    expect(screen.getByText('Submit')).toBeInTheDocument();
  });

  it('should render secondary button text', () => {
    render(
      <ModalFooter primaryButtonText="Submit" secondaryButtonText="Cancel" />
    );

    expect(screen.getByText('Cancel')).toBeInTheDocument();
  });

  it('should disable the primary button', () => {
    render(
      <ModalFooter
        primaryButtonText="Submit"
        primaryButtonDisabled
        secondaryButtonText="Cancel"
      />
    );

    expect(screen.getByText('Submit')).toHaveProperty('disabled', true);
  });

  it('should pass classes to primary button', () => {
    render(
      <ModalFooter
        primaryClassName="custom-class"
        primaryButtonText="Submit"
        secondaryButtonText="Cancel"
      />
    );

    expect(screen.getByText('Submit')).toHaveClass('custom-class');
  });

  it('should pass classes to secondary button', () => {
    render(
      <ModalFooter
        primaryButtonText="Submit"
        secondaryButtonText="Cancel"
        secondaryClassName="custom-class"
      />
    );

    expect(screen.getByText('Cancel')).toHaveClass('custom-class');
  });

  it('should call closeModal when the modal is closed', () => {
    const closeModal = jest.fn();
    render(
      <ModalFooter secondaryButtonText="Cancel" closeModal={closeModal} />
    );

    userEvent.click(screen.getByText('Cancel'));

    expect(closeModal).toHaveBeenCalled();
  });

  it('should render primary button as danger', () => {
    render(
      <ModalFooter
        secondaryButtonText="Cancel"
        primaryButtonText="Submit"
        danger
      />
    );

    expect(screen.getByText('Submit')).toHaveClass('cds--btn--danger');
    expect(screen.getByText('danger', { hidden: true })).toBeInTheDocument();
  });

  it('should call onRequestClose when close requested', () => {
    const onRequestClose = jest.fn();
    render(
      <ModalFooter
        onRequestClose={onRequestClose}
        secondaryButtonText="Cancel"
        primaryButtonText="Submit"
      />
    );

    userEvent.click(screen.getByText('Cancel'));

    expect(onRequestClose).toHaveBeenCalled();
  });

  it('should call onRequestSubmit when submit requested', () => {
    const onRequestSubmit = jest.fn();
    render(
      <ModalFooter
        onRequestSubmit={onRequestSubmit}
        secondaryButtonText="Cancel"
        primaryButtonText="Submit"
      />
    );

    userEvent.click(screen.getByText('Submit'));

    expect(onRequestSubmit).toHaveBeenCalled();
  });

  it('should render provided secondary buttons', () => {
    const { container } = render(
      <ModalFooter
        secondaryButtons={[
          {
            buttonText: 'Keep both',
            onClick: jest.fn(),
          },
          {
            buttonText: 'Rename',
            onClick: jest.fn(),
          },
        ]}
      />
    );

    expect(container.firstChild).toHaveClass('cds--modal-footer--three-button');
    expect(screen.getByText('Keep both')).toBeInTheDocument();
    expect(screen.getByText('Rename')).toBeInTheDocument();
  });
});
