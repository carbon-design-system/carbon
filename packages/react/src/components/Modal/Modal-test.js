/**
 * Copyright IBM Corp. 2016, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useRef, useState } from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';
import TextInput from '../TextInput';
import { AILabel } from '../AILabel';
import { FeatureFlags } from '../FeatureFlags';
import { ModalPresence } from './ModalPresence';

const prefix = 'cds';

const ModalWithPresenceFeatureFlag = ({ open = true, ...props }) => {
  return (
    <FeatureFlags enablePresence>
      <Modal {...props} open={open} />
    </FeatureFlags>
  );
};

const ModalWithPresenceContext = ({ open = true, ...props }) => {
  return (
    <ModalPresence open={open}>
      <Modal {...props} />
    </ModalPresence>
  );
};

describe.each([
  {
    title: 'Modal',
    Component: Modal,
  },
  {
    title: 'Modal with presence feature flag',
    Component: ModalWithPresenceFeatureFlag,
    isPresence: true,
  },
  {
    title: 'Modal with presence context',
    Component: ModalWithPresenceContext,
    isPresence: true,
  },
])('$title', ({ Component, isPresence }) => {
  it('should add extra classes that are passed via className', () => {
    render(
      <Component data-testid="modal-1" className="custom-class">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByTestId('modal-1')).toHaveClass('custom-class');
  });

  it('should set label if one is passed via props', () => {
    render(
      <Component modalLabel="Account resources">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByText('Account resources')).toBeInTheDocument();
  });

  it('should set modal heading if one is passed via props', () => {
    render(
      <Component modalHeading="Add a custom domain">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByText('Add a custom domain')).toBeInTheDocument();
  });

  it('should not be a passive modal by default', () => {
    render(
      <Component data-testid="modal-2">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByTestId('modal-2')).toHaveClass(`${prefix}--modal-tall`);
  });

  it('should be a passive modal when passiveModal is passed', () => {
    render(
      <Component data-testid="modal-3" passiveModal>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByTestId('modal-3')).not.toHaveClass(
      `${prefix}--modal-tall`
    );
  });

  it('should set id if one is passed via props', () => {
    render(
      <Component id="custom-modal-id" data-testid="modal-4">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByTestId('modal-4')).toHaveAttribute(
      'id',
      'custom-modal-id'
    );
  });

  it('should not place the svg icon in the accessibility tree', () => {
    render(
      <Component>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(`.${prefix}--modal-close__icon`)
    ).toHaveAttribute('aria-hidden', 'true');
  });

  it('should not make the icon tabbable', () => {
    render(
      <Component>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(`.${prefix}--modal-close__icon`)
    ).toHaveAttribute('focusable', 'false');
  });

  it('enables primary button by default', () => {
    render(
      <Component primaryButtonText="Primary button text">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByText('Primary button text')).toBeEnabled();
  });

  it('disables primary button is disablePrimaryButton prop is passed', () => {
    render(
      <Component primaryButtonText="Primary button text" primaryButtonDisabled>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByText('Primary button text')).toBeDisabled();
  });

  it('should set button text when passed via props', () => {
    render(
      <Component
        primaryButtonText="Primary button text"
        secondaryButtonText="Secondary button text">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByText('Primary button text')).toBeInTheDocument();
    expect(screen.getByText('Secondary button text')).toBeInTheDocument();
  });

  it('should allow you to pass a node for the primary and secondary buttons', () => {
    render(
      <Component
        primaryButtonText={<span data-testid="primary-node">testing</span>}
        secondaryButtonText={<span data-testid="secondary-node">testing</span>}>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByTestId('primary-node')).toBeInTheDocument();
    expect(screen.getByTestId('secondary-node')).toBeInTheDocument();
  });

  it('should support 2 secondary buttons', () => {
    render(
      <Component
        primaryButtonText="Primary button text"
        secondaryButtons={[
          {
            buttonText: 'First button',
            onClick: jest.fn(),
          },
          {
            buttonText: 'Second button',
            onClick: jest.fn(),
          },
        ]}>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByText('First button')).toBeInTheDocument();
    expect(screen.getByText('Second button')).toBeInTheDocument();
  });

  it('has the expected attributes when alert prop is passed', () => {
    render(
      <Component alert>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    expect(screen.getByRole('alertdialog')).toHaveAttribute('aria-describedby');
  });

  it('renders a danger button and appropriate classes when danger prop is passed', () => {
    render(
      <Component
        danger
        primaryButtonText="Danger button text"
        data-testid="modal-5">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByTestId('modal-5')).toHaveClass(
      `${prefix}--modal--danger`
    );
    expect(screen.getByText('Danger button text')).toHaveClass(
      `${prefix}--btn--danger`
    );
  });

  it('disables buttons when inline loading status is active', () => {
    render(
      <Component
        id="custom-modal-id"
        data-testid="modal-4"
        loadingStatus="active"
        loadingDescription="loading..."
        primaryButtonText="Save"
        secondaryButtonText="Cancel">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
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
      <Component
        danger
        primaryButtonText="Danger button text"
        data-testid="modal-5"
        decorator={<AILabel />}
      />
    );

    expect(container.firstChild).toHaveClass(`${prefix}--modal--decorator`);
  });

  it('should respect slug prop', () => {
    const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { container } = render(
      <Component
        danger
        primaryButtonText="Danger button text"
        data-testid="modal-5"
        slug={<AILabel />}
      />
    );

    expect(container.firstChild).toHaveClass(`${prefix}--modal--slug`);
    spy.mockRestore();
  });

  it('should set correct focus if data-modal-primary-focus is used', () => {
    render(
      <Component
        open
        id="custom-modal-id"
        data-testid="modal-4"
        loadingStatus="active"
        loadingDescription="loading..."
        primaryButtonText="Save"
        secondaryButtonText="Cancel">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          data-testid="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByTestId('text-input-1')).toHaveFocus();
  });

  it('should set correct focus on a danger modal if data-modal-primary-focus is used', () => {
    render(
      <Component
        open
        danger
        id="custom-modal-id"
        data-testid="modal-4"
        loadingStatus="active"
        loadingDescription="loading..."
        primaryButtonText="Save"
        secondaryButtonText="Cancel">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          data-testid="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByTestId('text-input-1')).toHaveFocus();
  });

  it('should set focus on secondary button if danger modal is used', () => {
    render(
      <Component
        open
        danger
        id="custom-modal-id"
        data-testid="modal-4"
        primaryButtonText="Save"
        secondaryButtonText="Cancel">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          id="text-input-1"
          data-testid="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByText('Cancel')).toHaveFocus();
  });

  it('should not focus the launcherButtonRef on initial render or after timers', () => {
    jest.useFakeTimers();

    const launcherButtonRef = React.createRef();

    render(
      <>
        <button ref={launcherButtonRef} data-testid="launcher-button">
          Launch Modal
        </button>
        <Component
          open={false}
          launcherButtonRef={launcherButtonRef}
          primaryButtonText="Save"
          secondaryButtonText="Cancel">
          <p>Modal Content</p>
        </Component>
      </>
    );

    const launcherButton = screen.getByTestId('launcher-button');

    expect(launcherButton).not.toHaveFocus();
    expect(document.body).toHaveFocus();

    jest.runAllTimers();

    expect(launcherButton).not.toHaveFocus();
    expect(document.body).toHaveFocus();

    jest.useRealTimers();
  });

  it('should focus the launcherButtonRef on close when defined', async () => {
    const ModalExample = () => {
      const buttonRef = useRef(null);
      const [isOpen, setIsOpen] = useState(false);

      return (
        <>
          <button ref={buttonRef} type="button" onClick={() => setIsOpen(true)}>
            Launch modal
          </button>
          <Component
            data-testid="modal"
            launcherButtonRef={buttonRef}
            open={isOpen}
            onRequestClose={() => {
              setIsOpen(false);
            }}
          />
        </>
      );
    };
    render(<ModalExample />);

    const button = screen.getByRole('button', { name: /Launch modal/ });
    await userEvent.click(button);

    expect(screen.getByTestId('modal')).toHaveClass('is-visible');

    await userEvent.click(screen.getByRole('button', { name: /Close/ }));

    if (isPresence) {
      expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
    } else {
      expect(screen.getByTestId('modal')).not.toHaveClass('is-visible');
    }

    expect(button).toHaveFocus();
  });

  describe('enable-dialog-element feature flag', () => {
    it('should bring launcherButtonRef element into focus on close when the ref is defined', async () => {
      const ModalExample = () => {
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
      render(<ModalExample />);

      const closeButton = screen.getByTestId('close');
      const focusElem = screen.getByTestId('focusElem');

      expect(focusElem).not.toHaveFocus();
      await userEvent.click(closeButton);
      await waitFor(() => {
        expect(focusElem).toHaveFocus();
      });
    });
  });
});

describe('state', () => {
  it('should set expected class when state is open', () => {
    render(
      <Modal
        open
        primaryButtonText="Primary button"
        secondaryButtonText="Secondary button"
        data-testid="modal-6">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Modal>
    );

    expect(screen.getByTestId('modal-6')).toHaveClass('is-visible');
  });
});

describe('state with presence feature flag', () => {
  it('should be present when state is open', () => {
    render(<ModalWithPresenceFeatureFlag open data-testid="modal" />);
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
  });

  it('should not be present when open is false', () => {
    render(<ModalWithPresenceFeatureFlag open={false} data-testid="modal" />);
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('should not be present when open is undefined', () => {
    render(
      <FeatureFlags enablePresence>
        <Modal data-testid="modal" />
      </FeatureFlags>
    );
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });
});

describe('state with presence context', () => {
  it('should be present when state is open', () => {
    render(<ModalWithPresenceContext open data-testid="modal" />);
    expect(screen.queryByTestId('modal')).toBeInTheDocument();
  });

  it('should not be present when open is false', () => {
    render(<ModalWithPresenceContext open={false} data-testid="modal" />);
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('should not be present when open is undefined', () => {
    render(
      <ModalPresence>
        <Modal data-testid="modal" />
      </ModalPresence>
    );
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it('should handle sibling and child modals exclusively', async () => {
    const ModalExample = () => {
      const [isSiblingOpen, setIsSiblingOpen] = useState(false);
      const [isChildOpen, setIsChildOpen] = useState(false);

      return (
        <ModalPresence open>
          <Modal data-testid="modal">
            <button type="button" onClick={() => setIsSiblingOpen(true)}>
              Launch sibling modal
            </button>
          </Modal>
          <Modal
            data-testid="sibling-modal"
            open={isSiblingOpen}
            onRequestClose={() => setIsSiblingOpen(false)}>
            <button type="button" onClick={() => setIsChildOpen(true)}>
              Launch child modal
            </button>
            <Modal
              data-testid="child-modal"
              open={isChildOpen}
              onRequestClose={() => setIsChildOpen(false)}
            />
          </Modal>
        </ModalPresence>
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

describe.each([
  {
    title: 'events',
    Component: Modal,
  },
  {
    title: 'events with presence feature flag',
    Component: ModalWithPresenceFeatureFlag,
  },
  {
    title: 'events with presence context',
    Component: ModalWithPresenceContext,
  },
])('$title', ({ Component }) => {
  it('should set expected class when state is open', () => {
    render(
      <Component
        open
        primaryButtonText="Primary button"
        secondaryButtonText="Secondary button"
        data-testid="modal-6">
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    expect(screen.getByTestId('modal-6')).toHaveClass('is-visible');
  });

  describe('close behavior for clicks outside the modal', () => {
    describe('passive', () => {
      it('should close on outside click by default', async () => {
        const onRequestClose = jest.fn();
        render(
          <Component
            open
            modalHeading="A test heading"
            onRequestClose={onRequestClose}
            passiveModal>
            <p>Test content</p>
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
        expect(onRequestClose).toHaveBeenCalled();
      });
      it('should not close on outside click when preventCloseOnClickOutside', async () => {
        const onRequestClose = jest.fn();
        render(
          <Component
            open
            primaryButtonText="Primary button"
            secondaryButtonText="Secondary button"
            onRequestClose={onRequestClose}
            passiveModal
            preventCloseOnClickOutside>
            <p>Test content</p>
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
        expect(onRequestClose).not.toHaveBeenCalled();
      });
      it('should close on outside click when preventCloseOnClickOutside is explicitly false', async () => {
        const onRequestClose = jest.fn();
        render(
          <Component
            open
            primaryButtonText="Primary button"
            secondaryButtonText="Secondary button"
            onRequestClose={onRequestClose}
            passiveModal
            preventCloseOnClickOutside={false}>
            <p>Test content</p>
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
        expect(onRequestClose).toHaveBeenCalled();
      });
    });
    describe('non-passive', () => {
      it('should not close on outside click by default', async () => {
        const onRequestClose = jest.fn();
        render(
          <Component
            open
            primaryButtonText="Primary button"
            secondaryButtonText="Secondary button"
            onRequestClose={onRequestClose}>
            <p>Test content</p>
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
        expect(onRequestClose).not.toHaveBeenCalled();
      });
      it('should not close on outside click when preventCloseOnClickOutside', async () => {
        const onRequestClose = jest.fn();
        render(
          <Component
            open
            primaryButtonText="Primary button"
            secondaryButtonText="Secondary button"
            onRequestClose={onRequestClose}
            preventCloseOnClickOutside>
            <p>Test content</p>
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
        expect(onRequestClose).not.toHaveBeenCalled();
      });
      it('should close on outside click when preventCloseOnClickOutside is explicitly false', async () => {
        const spy = jest.spyOn(console, 'warn').mockImplementation(() => {});
        const onRequestClose = jest.fn();

        render(
          <Component
            open
            primaryButtonText="Primary button"
            secondaryButtonText="Secondary button"
            onRequestClose={onRequestClose}
            preventCloseOnClickOutside={false}>
            <p>Test content</p>
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
        expect(onRequestClose).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith(
          'Warning: `<Modal>` prop `preventCloseOnClickOutside` should not be `false` when `passiveModal` is `false`. Transactional, non-passive Modals should not be dissmissable by clicking outside. See: https://carbondesignsystem.com/components/modal/usage/#transactional-modal'
        );

        spy.mockRestore();
      });
    });
  });

  it('should not handle close when inner content is clicked', async () => {
    const onRequestClose = jest.fn();
    render(
      <Component
        open
        primaryButtonText="Primary button"
        secondaryButtonText="Secondary button"
        onRequestClose={onRequestClose}>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    const innerModal = screen.getByRole('dialog');
    await userEvent.click(innerModal);
    expect(onRequestClose).not.toHaveBeenCalled();
  });

  it('should handle close keyDown events', async () => {
    const onRequestClose = jest.fn();
    render(
      <Component
        open
        primaryButtonText="Primary button"
        secondaryButtonText="Secondary button"
        onRequestClose={onRequestClose}>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    await userEvent.keyboard('{Escape}');
    expect(onRequestClose).toHaveBeenCalled();
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

  it('should handle submit keyDown events with shouldSubmitOnEnter enabled', async () => {
    const onRequestSubmit = jest.fn();
    render(
      <Component
        open
        primaryButtonText="Primary button"
        secondaryButtonText="Secondary button"
        onRequestSubmit={onRequestSubmit}
        shouldSubmitOnEnter>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    await userEvent.keyboard('{Enter}');
    expect(onRequestSubmit).toHaveBeenCalled();
  });

  it('should not handle submit keyDown events if shouldSubmitOnEnter is not enabled', async () => {
    const onRequestSubmit = jest.fn();
    render(
      <Component
        open
        primaryButtonText="Primary button"
        secondaryButtonText="Secondary button"
        onRequestSubmit={onRequestSubmit}>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    await userEvent.keyboard('{Enter}');
    expect(onRequestSubmit).not.toHaveBeenCalled();
  });

  it('should close by default on secondary button click', async () => {
    const onRequestClose = jest.fn();
    render(
      <Component
        open
        primaryButtonText="Primary button"
        secondaryButtonText="Secondary button"
        onRequestClose={onRequestClose}>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    const secondaryBtn = screen.getByText('Secondary button');
    await userEvent.click(secondaryBtn);
    expect(onRequestClose).toHaveBeenCalled();
  });

  it('should handle custom secondary button events', async () => {
    const onSecondarySubmit = jest.fn();
    render(
      <Component
        open
        primaryButtonText="Primary button"
        secondaryButtonText="Secondary button"
        onSecondarySubmit={onSecondarySubmit}>
        <p>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </p>
        <TextInput
          data-modal-primary-focus
          id="text-input-1"
          labelText="Domain name"
        />
      </Component>
    );

    const secondaryBtn = screen.getByText('Secondary button');
    await userEvent.click(secondaryBtn);
    expect(onSecondarySubmit).toHaveBeenCalled();
  });

  it('should not double submit when Enter key is pressed on primary button with `shouldSubmitOnEnter` enabled', async () => {
    const { keyboard } = userEvent;
    const onRequestSubmit = jest.fn();

    render(
      <Component
        open
        primaryButtonText="Submit"
        secondaryButtonText="Cancel"
        onRequestSubmit={onRequestSubmit}
        shouldSubmitOnEnter>
        <p>Test content</p>
      </Component>
    );

    const primaryButton = screen.getByRole('button', { name: 'Submit' });

    primaryButton.focus();
    expect(primaryButton).toHaveFocus();

    await keyboard('{Enter}');
    expect(onRequestSubmit).toHaveBeenCalledTimes(1);
  });

  it('should close modal when ESC key is pressed after clicking outside to lose focus', async () => {
    const onRequestClose = jest.fn();
    render(
      <div>
        <div
          data-testid="outside-area"
          style={{ width: '100px', height: '100px' }}>
          Outside area
        </div>
        <Component
          open
          primaryButtonText="Primary button"
          secondaryButtonText="Secondary button"
          onRequestClose={onRequestClose}>
          <p>
            Custom domains direct requests for your apps in this Cloud Foundry
            organization to a URL that you own. A custom domain can be a shared
            domain, a shared subdomain, or a shared domain and host.
          </p>
          <TextInput
            data-modal-primary-focus
            id="text-input-1"
            labelText="Domain name"
          />
        </Component>
      </div>
    );

    expect(screen.getByRole('presentation')).toHaveClass('is-visible');
    expect(screen.getByLabelText('Domain name')).toHaveFocus();
    await userEvent.click(screen.getByTestId('outside-area'));
    expect(screen.getByLabelText('Domain name')).not.toHaveFocus();
    await userEvent.keyboard('{Escape}');
    expect(onRequestClose).toHaveBeenCalled();
  });
});
