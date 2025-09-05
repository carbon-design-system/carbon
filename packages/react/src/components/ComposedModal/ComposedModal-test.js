/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useRef, useState } from 'react';
import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ComposedModal, { ModalBody } from './ComposedModal';
import { ComposedModalPresence } from './ComposedModalPresence';
import { FeatureFlags, useFeatureFlag } from '../FeatureFlags';
import { ModalHeader } from './ModalHeader';
import { ModalFooter } from './ModalFooter';
import { TextInput } from '../../';
import { AILabel } from '../AILabel';

const prefix = 'cds';

const ComposedModalWithPresenceFeatureFlag = ({ open = true, ...props }) => {
  const enableDialogElement = useFeatureFlag('enable-dialog-element');
  return (
    <FeatureFlags enablePresence enableDialogElement={enableDialogElement}>
      <ComposedModal {...props} open={open} />
    </FeatureFlags>
  );
};

const ComposedModalWithPresenceContext = ({ open = true, ...props }) => {
  return (
    <ComposedModalPresence open={open}>
      <ComposedModal {...props} />
    </ComposedModalPresence>
  );
};

describe.each([
  { title: 'ComposedModal', Component: ComposedModal },
  {
    title: 'ComposedModal with presence feature flag',
    Component: ComposedModalWithPresenceFeatureFlag,
    isPresence: true,
  },
  {
    title: 'ComposedModal with presence context',
    Component: ComposedModalWithPresenceContext,
    isPresence: true,
  },
])('$title', ({ Component, isPresence }) => {
  describe('it renders as expected', () => {
    it('supports a custom class on the outermost div', () => {
      render(<Component className="custom-class" />);

      expect(screen.getByRole('presentation', { hidden: true })).toHaveClass(
        'custom-class'
      );
    });

    it('supports a custom class on the container div', () => {
      render(<Component containerClassName="custom-class" />);

      expect(screen.getByRole('dialog', { hidden: true })).toHaveClass(
        'custom-class'
      );
    });

    it('supports a custom class on the modal body', () => {
      render(
        <Component>
          <ModalBody className="custom-class" data-testid="modal-body" />
        </Component>
      );

      expect(screen.getByTestId('modal-body')).toHaveClass('custom-class');
    });

    it('should spread props onto the outermost div', () => {
      render(<Component data-testid="modal" />);

      expect(
        screen.getByRole('presentation', { hidden: true })
      ).toHaveAttribute('data-testid', 'modal');
    });

    it('should be labelled by a provided aria-label', () => {
      render(<Component aria-label="modal" />);

      expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute(
        'aria-label',
        'modal'
      );
    });

    it('should be labelled by a provided aria-labelledby', () => {
      render(
        <div>
          <label id="label-modal-id">Label for modal</label>
          <Component aria-labelledby="label-modal-id">
            <ModalHeader>Modal header</ModalHeader>
            <ModalBody>This is the modal body content</ModalBody>
            <ModalFooter primaryButtonText="Add" secondaryButtonText="Cancel" />
          </Component>
        </div>
      );

      expect(screen.getByRole('dialog', { hidden: true })).toHaveAttribute(
        'aria-labelledby',
        'label-modal-id'
      );
    });

    it('should change submit to danger button', () => {
      render(
        <Component danger open>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>This is the modal body content</ModalBody>
          <ModalFooter
            danger
            primaryButtonText="Add"
            secondaryButtonText="Cancel"
          />
        </Component>
      );

      expect(screen.getByRole('presentation', { hidden: true })).toHaveClass(
        'cds--modal--danger'
      );
    });

    it('calls onClose when close button is clicked', async () => {
      const onClose = jest.fn();
      render(
        <Component open onClose={onClose}>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>This is the modal body content</ModalBody>
        </Component>
      );

      await userEvent.click(screen.getByLabelText('Close'));

      expect(onClose).toHaveBeenCalled();
    });

    it('should not close when onClose returns false', async () => {
      const onClose = () => false;
      render(
        <Component open onClose={onClose}>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>This is the modal body content</ModalBody>
        </Component>
      );

      await userEvent.click(screen.getByLabelText('Close'));

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
            <Component
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
            </Component>
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
            <Component open={isOpen} preventCloseOnClickOutside>
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
            </Component>
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
            <Component
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
            </Component>
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
            <Component open={isOpen} preventCloseOnClickOutside>
              <ModalHeader>Modal header</ModalHeader>
              <ModalBody>
                This is the modal body content
                <TextInput
                  id="text-input-1"
                  data-testid="test-id-1"
                  labelText="text input"
                />
              </ModalBody>
            </Component>
          </>
        );
      }
      render(<ComposedModalExample />);

      await userEvent.click(screen.getByText('Click me'));

      const elementModal = screen.getByRole('presentation', { hidden: true });
      expect(elementModal).toBeVisible();

      const elementInput = screen.getByRole('button', { name: 'Close' });
      expect(elementInput).toHaveFocus();
    });

    it('should focus on launcherButtonRef element on close when defined', async () => {
      const ComposedModalExample = () => {
        const buttonRef = useRef(null);
        const [isOpen, setIsOpen] = useState(false);

        return (
          <>
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setIsOpen(true)}>
              Launch modal
            </button>
            <Component
              launcherButtonRef={buttonRef}
              open={isOpen}
              onClose={() => {
                setIsOpen(false);
              }}>
              <ModalHeader>Header</ModalHeader>
            </Component>
          </>
        );
      };
      render(<ComposedModalExample />);

      const button = screen.getByRole('button', { name: /Launch modal/ });
      await userEvent.click(button);

      expect(screen.getByRole('presentation', { hidden: true })).toHaveClass(
        'is-visible'
      );

      await userEvent.click(screen.getByRole('button', { name: /Close/ }));

      if (isPresence) {
        expect(
          screen.queryByRole('presentation', {
            hidden: true,
          })
        ).not.toBeInTheDocument();
      } else {
        expect(
          screen.getByRole('presentation', {
            hidden: true,
          })
        ).not.toHaveClass('is-visible');
      }

      expect(button).toHaveFocus();
    });

    it('should change size based on size prop', () => {
      render(
        <Component open size="lg">
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>This is the modal body content</ModalBody>
        </Component>
      );

      expect(screen.getByRole('dialog', { hidden: true })).toHaveClass(
        `${prefix}--modal-container--lg`
      );
    });

    it('disables buttons when inline loading status is active', () => {
      render(
        <Component open>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>This is the modal body content</ModalBody>
          <ModalFooter
            primaryButtonText="Add"
            secondaryButtonText="Cancel"
            loadingStatus="active"
            loadingDescription="loading..."></ModalFooter>
        </Component>
      );

      expect(screen.getByTitle('loading')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: 'loading loading...' })
      ).toBeDisabled();
      expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
    });

    it('should respect decorator prop', () => {
      const { container } = render(
        <Component open decorator={<AILabel />}>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>This is the modal body content</ModalBody>
          <ModalFooter
            primaryButtonText="Add"
            secondaryButtonText="Cancel"
            loadingStatus="active"
            loadingDescription="loading..."></ModalFooter>
        </Component>
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
            <Component
              open={open}
              launcherButtonRef={focusRef}
              onClick={() => setOpen(false)}>
              <button data-testid="close" onClick={() => setOpen(false)}>
                Close
              </button>
            </Component>
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
      <Component open slug={<AILabel />}>
        <ModalHeader>Modal header</ModalHeader>
        <ModalBody>This is the modal body content</ModalBody>
        <ModalFooter
          primaryButtonText="Add"
          secondaryButtonText="Cancel"
          loadingStatus="active"
          loadingDescription="loading..."></ModalFooter>
      </Component>
    );

    expect(
      screen.getByRole('button', { name: 'AI Show information' })
    ).toBeInTheDocument();
    spy.mockRestore();
  });

  it('should handle onClick events', async () => {
    const onClick = jest.fn();
    render(
      <Component open onClick={onClick}>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
      </Component>
    );
    const modal = screen.getByRole('dialog');
    await userEvent.click(modal);
    expect(onClick).toHaveBeenCalled();
  });

  it('should NOT close when clicked inside dialog window, dragged outside and released mouse button', async () => {
    const onClose = jest.fn();
    render(
      <Component open onClose={onClose}>
        <ModalBody data-testid="modal-body-1">
          This is the modal body content
        </ModalBody>
      </Component>
    );

    const modalBody = screen.getByTestId('modal-body-1');
    const backgroundLayer = screen.getByRole('presentation');

    fireEvent.mouseDown(modalBody, { target: modalBody });
    fireEvent.click(backgroundLayer, { target: backgroundLayer });

    expect(onClose).not.toHaveBeenCalled();
  });

  describe('close behavior for clicks outside the modal', () => {
    describe('passive', () => {
      it('should close on outside click by default', async () => {
        const onClose = jest.fn();
        render(
          <Component open onClose={onClose}>
            <ModalHeader>ModalHeader content</ModalHeader>
            <ModalBody>ModalBody content</ModalBody>
            {/* ModalFooter is omitted, this is what makes it passive */}
          </Component>
        );

        // The background layer is used here instead of a button outside the
        // modal because a real user cannot interact with a button. The
        // backround layer is in the way.
        const backgroundLayer = screen.getByRole('presentation', {
          hidden: true,
        });
        expect(backgroundLayer).toHaveClass('is-visible');

        await userEvent.click(backgroundLayer);

        if (isPresence) {
          expect(backgroundLayer).not.toBeInTheDocument();
        } else {
          expect(backgroundLayer).not.toHaveClass('is-visible');
        }

        expect(onClose).toHaveBeenCalled();
      });
      it('should not close on outside click when preventCloseOnClickOutside', async () => {
        const onClose = jest.fn();
        render(
          <Component open onClose={onClose} preventCloseOnClickOutside>
            <ModalHeader>ModalHeader content</ModalHeader>
            <ModalBody>ModalBody content</ModalBody>
            {/* ModalFooter is omitted, this is what makes it passive */}
          </Component>
        );

        // The background layer is used here instead of a button outside the
        // modal because a real user cannot interact with a button. The
        // backround layer is in the way.
        const backgroundLayer = screen.getByRole('presentation', {
          hidden: true,
        });
        expect(backgroundLayer).toHaveClass('is-visible');

        await userEvent.click(backgroundLayer);
        expect(backgroundLayer).toHaveClass('is-visible');
        expect(onClose).not.toHaveBeenCalled();
      });
      it('should close on outside click when preventCloseOnClickOutside is explicitly false', async () => {
        const onClose = jest.fn();
        render(
          <Component open onClose={onClose} preventCloseOnClickOutside={false}>
            <ModalHeader>ModalHeader content</ModalHeader>
            <ModalBody>ModalBody content</ModalBody>
            {/* ModalFooter is omitted, this is what makes it passive */}
          </Component>
        );

        // The background layer is used here instead of a button outside the
        // modal because a real user cannot interact with a button. The
        // backround layer is in the way.
        const backgroundLayer = screen.getByRole('presentation', {
          hidden: true,
        });
        expect(backgroundLayer).toHaveClass('is-visible');

        await userEvent.click(backgroundLayer);

        if (isPresence) {
          expect(backgroundLayer).not.toBeInTheDocument();
        } else {
          expect(backgroundLayer).not.toHaveClass('is-visible');
        }

        expect(onClose).toHaveBeenCalled();
      });
    });
    describe('non-passive', () => {
      it('should not close on outside click by default', async () => {
        const onClose = jest.fn();
        render(
          <Component open onClose={onClose}>
            <ModalHeader>ModalHeader content</ModalHeader>
            <ModalBody>ModalBody content</ModalBody>
            <ModalFooter
              primaryButtonText="Confirm"
              secondaryButtonText="Cancel"
            />
          </Component>
        );

        // The background layer is used here instead of a button outside the
        // modal because a real user cannot interact with a button. The
        // backround layer is in the way.
        const backgroundLayer = screen.getByRole('presentation', {
          hidden: true,
        });
        expect(backgroundLayer).toHaveClass('is-visible');

        await userEvent.click(backgroundLayer);
        expect(backgroundLayer).toHaveClass('is-visible');
        expect(onClose).not.toHaveBeenCalled();
      });
      it('should not close on outside click when preventCloseOnClickOutside', async () => {
        const onClose = jest.fn();
        render(
          <Component open onClose={onClose} preventCloseOnClickOutside>
            <ModalHeader>ModalHeader content</ModalHeader>
            <ModalBody>ModalBody content</ModalBody>
            <ModalFooter
              primaryButtonText="Confirm"
              secondaryButtonText="Cancel"
            />
          </Component>
        );

        // The background layer is used here instead of a button outside the
        // modal because a real user cannot interact with a button. The
        // backround layer is in the way.
        const backgroundLayer = screen.getByRole('presentation', {
          hidden: true,
        });
        expect(backgroundLayer).toHaveClass('is-visible');

        await userEvent.click(backgroundLayer);
        expect(backgroundLayer).toHaveClass('is-visible');
        expect(onClose).not.toHaveBeenCalled();
      });
      it('should close on outside click when preventCloseOnClickOutside is explicitly false', async () => {
        const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const onClose = jest.fn();

        render(
          <ComposedModal
            open
            onClose={onClose}
            preventCloseOnClickOutside={false}>
            <ModalHeader>ModalHeader content</ModalHeader>
            <ModalBody>ModalBody content</ModalBody>
            <ModalFooter
              primaryButtonText="Confirm"
              secondaryButtonText="Cancel"
            />
          </ComposedModal>
        );

        // The background layer is used here instead of a button outside the
        // modal because a real user cannot interact with a button. The
        // backround layer is in the way.
        const backgroundLayer = screen.getByRole('presentation', {
          hidden: true,
        });
        expect(backgroundLayer).toHaveClass('is-visible');

        await userEvent.click(backgroundLayer);
        expect(backgroundLayer).not.toHaveClass('is-visible');
        expect(onClose).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(
          'Warning: `<ComposedModal>` prop `preventCloseOnClickOutside` should not be `false` when `<ModalFooter>` is present. Transactional, non-passive Modals should not be dissmissable by clicking outside. See: https://carbondesignsystem.com/components/modal/usage/#transactional-modal'
        );

        spy.mockRestore();
      });
    });
  });

  it('should focus on launcherButtonRef element on close when defined', async () => {
    const ComposedModalExample = () => {
      const [open, setOpen] = useState(true);
      const focusRef = useRef();
      return (
        <>
          <Component
            open={open}
            launcherButtonRef={focusRef}
            onClick={() => setOpen(false)}>
            <button data-testid="close" onClick={() => setOpen(false)}>
              Close
            </button>
          </Component>
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

  it('should close modal when ESC key is pressed regardless of focus', async () => {
    const onClose = jest.fn();
    render(
      <div>
        <div
          data-testid="outside-area"
          style={{ width: '100px', height: '100px' }}>
          Outside area
        </div>
        <ComposedModal open onClose={onClose}>
          <ModalHeader>Modal header</ModalHeader>
          <ModalBody>
            This is the modal body content
            <TextInput
              data-modal-primary-focus
              id="text-input-1"
              labelText="Domain name"
            />
          </ModalBody>
          <ModalFooter primaryButtonText="Add" secondaryButtonText="Cancel" />
        </ComposedModal>
      </div>
    );

    expect(screen.getByRole('presentation', { hidden: true })).toHaveClass(
      'is-visible'
    );
    await userEvent.click(screen.getByTestId('outside-area'));

    const inputField = screen.getByLabelText('Domain name');
    expect(inputField).not.toHaveFocus();
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape', keyCode: 27 });
    expect(onClose).toHaveBeenCalled();
  });
});

describe('state', () => {
  it('should set expected class when state is open', () => {
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
});

describe('state with presence feature flag', () => {
  it('should be present when state is open', () => {
    render(<ComposedModalWithPresenceFeatureFlag open data-testid="modal" />);
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
  });

  it('should not be present when open is false', () => {
    render(
      <ComposedModalWithPresenceFeatureFlag open={false} data-testid="modal" />
    );
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('should not be present when open is undefined', () => {
    render(
      <FeatureFlags enablePresence>
        <ComposedModal data-testid="modal" />
      </FeatureFlags>
    );
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});

describe('state with presence context', () => {
  it('should be present when state is open', () => {
    render(<ComposedModalWithPresenceContext open data-testid="modal" />);
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
  });

  it('should not be present when open is false', () => {
    render(
      <ComposedModalWithPresenceContext open={false} data-testid="modal" />
    );
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('should not be present when open is undefined', () => {
    render(
      <ComposedModalPresence>
        <ComposedModal data-testid="modal" />
      </ComposedModalPresence>
    );
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('should handle sibling and child modals exclusively', async () => {
    const ModalExample = () => {
      const [isSiblingOpen, setIsSiblingOpen] = useState(false);
      const [isChildOpen, setIsChildOpen] = useState(false);

      return (
        <ComposedModalPresence open>
          <ComposedModal data-testid="modal">
            <ModalHeader>Modal Header</ModalHeader>
            <ModalBody>
              <button type="button" onClick={() => setIsSiblingOpen(true)}>
                Launch sibling modal
              </button>
            </ModalBody>
          </ComposedModal>
          <ComposedModal
            data-testid="sibling-modal"
            open={isSiblingOpen}
            onClose={() => setIsSiblingOpen(false)}>
            <ModalHeader>Modal Header</ModalHeader>
            <ModalBody>
              <button type="button" onClick={() => setIsChildOpen(true)}>
                Launch child modal
              </button>
              <ComposedModal
                data-testid="child-modal"
                open={isChildOpen}
                onClose={() => setIsChildOpen(false)}>
                <ModalHeader>Modal Header</ModalHeader>
              </ComposedModal>
            </ModalBody>
          </ComposedModal>
        </ComposedModalPresence>
      );
    };
    render(<ModalExample />);

    expect(screen.queryByTestId('modal')).toBeInTheDocument();
    expect(screen.queryByTestId('sibling-modal')).not.toBeInTheDocument();
    expect(screen.queryByTestId('child-modal')).not.toBeInTheDocument();

    await userEvent.click(
      screen.getByRole('button', {
        name: /Launch sibling modal/,
      })
    );

    const siblingModal = screen.queryByTestId('sibling-modal');

    expect(screen.queryByTestId('modal')).toBeInTheDocument();
    expect(siblingModal).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole('button', {
        name: /Launch child modal/,
      })
    );

    const childModal = screen.queryByTestId('child-modal');

    expect(screen.queryByTestId('modal')).toBeInTheDocument();
    expect(siblingModal).toBeInTheDocument();
    expect(childModal).toBeInTheDocument();

    await userEvent.click(
      within(childModal).getByRole('button', {
        name: /Close/,
      })
    );

    expect(childModal).not.toBeInTheDocument();
    expect(siblingModal).toBeInTheDocument();
    expect(screen.queryByTestId('modal')).toBeInTheDocument();

    await userEvent.click(
      within(siblingModal).getByRole('button', {
        name: /Close/,
      })
    );

    expect(childModal).not.toBeInTheDocument();
    expect(siblingModal).not.toBeInTheDocument();
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
  });
});
