/**
 * Copyright IBM Corp. 2016, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Modal from './Modal';
import TextInput from '../TextInput';
import { Slug } from '../Slug';

const prefix = 'cds';

describe('Modal', () => {
  it('should add extra classes that are passed via className', () => {
    render(
      <Modal data-testid="modal-1" className="custom-class">
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

    expect(screen.getByTestId('modal-1')).toHaveClass('custom-class');
  });

  it('should set label if one is passed via props', () => {
    render(
      <Modal modalLabel="Account resources">
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

    expect(screen.getByText('Account resources')).toBeInTheDocument();
  });

  it('should set modal heading if one is passed via props', () => {
    render(
      <Modal modalHeading="Add a custom domain">
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

    expect(screen.getByText('Add a custom domain')).toBeInTheDocument();
  });

  it('should not be a passive modal by default', () => {
    render(
      <Modal data-testid="modal-2">
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

    expect(screen.getByTestId('modal-2')).toHaveClass(`${prefix}--modal-tall`);
  });

  it('should be a passive modal when passiveModal is passed', () => {
    render(
      <Modal data-testid="modal-3" passiveModal>
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

    expect(screen.getByTestId('modal-3')).not.toHaveClass(
      `${prefix}--modal-tall`
    );
  });

  it('should set id if one is passed via props', () => {
    render(
      <Modal id="custom-modal-id" data-testid="modal-4">
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

    expect(screen.getByTestId('modal-4')).toHaveAttribute(
      'id',
      'custom-modal-id'
    );
  });

  it('should not place the svg icon in the accessibility tree', () => {
    render(
      <Modal>
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

    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(`.${prefix}--modal-close__icon`)
    ).toHaveAttribute('aria-hidden', 'true');
  });

  it('should not make the icon tabbable', () => {
    render(
      <Modal>
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

    expect(
      // eslint-disable-next-line testing-library/no-node-access
      document.querySelector(`.${prefix}--modal-close__icon`)
    ).toHaveAttribute('focusable', 'false');
  });

  it('enables primary button by default', () => {
    render(
      <Modal primaryButtonText="Primary button text">
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

    expect(screen.getByText('Primary button text')).toBeEnabled();
  });

  it('disables primary button is disablePrimaryButton prop is passed', () => {
    render(
      <Modal primaryButtonText="Primary button text" primaryButtonDisabled>
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

    expect(screen.getByText('Primary button text')).toBeDisabled();
  });

  it('should set button text when passed via props', () => {
    render(
      <Modal
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
      </Modal>
    );

    expect(screen.getByText('Primary button text')).toBeInTheDocument();
    expect(screen.getByText('Secondary button text')).toBeInTheDocument();
  });

  it('should allow you to pass a node for the primary and secondary buttons', () => {
    render(
      <Modal
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
      </Modal>
    );

    expect(screen.getByTestId('primary-node')).toBeInTheDocument();
    expect(screen.getByTestId('secondary-node')).toBeInTheDocument();
  });

  it('should support 2 secondary buttons', () => {
    render(
      <Modal
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
      </Modal>
    );

    expect(screen.getByText('First button')).toBeInTheDocument();
    expect(screen.getByText('Second button')).toBeInTheDocument();
  });

  it('has the expected attributes when alert prop is passed', () => {
    render(
      <Modal alert>
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

    expect(screen.getByRole('alertdialog')).toBeInTheDocument();
    expect(screen.getByRole('alertdialog')).toHaveAttribute('aria-describedby');
  });

  it('renders a danger button and appropriate classes when danger prop is passed', () => {
    render(
      <Modal
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
      </Modal>
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
      <Modal
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
      </Modal>
    );

    expect(screen.getByTitle('loading')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'loading loading...' })
    ).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeDisabled();
  });

  it('should respect slug prop', () => {
    const { container } = render(
      <Modal
        danger
        primaryButtonText="Danger button text"
        data-testid="modal-5"
        slug={<Slug />}
      />
    );

    expect(container.firstChild).toHaveClass(`${prefix}--modal--slug`);
  });
});

describe('events', () => {
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

  it('should handle close when outside of modal is clicked', async () => {
    const onRequestClose = jest.fn();
    render(
      <Modal
        open
        primaryButtonText="Primary button"
        secondaryButtonText="Secondary button"
        data-testid="modal-7"
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
      </Modal>
    );

    const outerModal = screen.getByTestId('modal-7');
    await userEvent.click(outerModal);
    expect(onRequestClose).toHaveBeenCalled();
  });

  it('should not handle close when inner content is clicked', async () => {
    const onRequestClose = jest.fn();
    render(
      <Modal
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
      </Modal>
    );

    const innerModal = screen.getByRole('dialog');
    await userEvent.click(innerModal);
    expect(onRequestClose).not.toHaveBeenCalled();
  });

  it('should not handle close when outside of modal is clicked and preventCloseOnClickOutside is passed', async () => {
    const onRequestClose = jest.fn();
    render(
      <Modal
        open
        primaryButtonText="Primary button"
        secondaryButtonText="Secondary button"
        data-testid="modal-8"
        onRequestClose={onRequestClose}
        preventCloseOnClickOutside>
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

    const outerModal = screen.getByTestId('modal-8');
    await userEvent.click(outerModal);
    expect(onRequestClose).not.toHaveBeenCalled();
  });

  it('should handle close keyDown events', async () => {
    const onRequestClose = jest.fn();
    render(
      <Modal
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
      </Modal>
    );

    await userEvent.keyboard('{Escape}');
    expect(onRequestClose).toHaveBeenCalled();
  });

  it('should handle submit keyDown events with shouldSubmitOnEnter enabled', async () => {
    const onRequestSubmit = jest.fn();
    render(
      <Modal
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
      </Modal>
    );

    await userEvent.keyboard('{Enter}');
    expect(onRequestSubmit).toHaveBeenCalled();
  });

  it('should not handle submit keyDown events if shouldSubmitOnEnter is not enabled', async () => {
    const onRequestSubmit = jest.fn();
    render(
      <Modal
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
      </Modal>
    );

    await userEvent.keyboard('{Enter}');
    expect(onRequestSubmit).not.toHaveBeenCalled();
  });

  it('should close by default on secondary button click', async () => {
    const onRequestClose = jest.fn();
    render(
      <Modal
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
      </Modal>
    );

    const secondaryBtn = screen.getByText('Secondary button');
    await userEvent.click(secondaryBtn);
    expect(onRequestClose).toHaveBeenCalled();
  });

  it('should handle custom secondary button events', async () => {
    const onSecondarySubmit = jest.fn();
    render(
      <Modal
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
      </Modal>
    );

    const secondaryBtn = screen.getByText('Secondary button');
    await userEvent.click(secondaryBtn);
    expect(onSecondarySubmit).toHaveBeenCalled();
  });
});
