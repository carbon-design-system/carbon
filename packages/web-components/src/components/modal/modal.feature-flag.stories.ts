/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import '../feature-flags/index';
import mdx from './modal.feature-flag.mdx';
import '../../../.storybook/templates/with-feature-flags';
import '../button';
import '../text-input';
import '../select';
import '../textarea';
import { MODAL_SIZE } from './modal';

/**
 * TODO:
 * Once the other feature flags are implemented, please remember to update
 * meta to { title: 'Components/Modal/Feature Flags',} in this file,
 * and <Meta title="Components/Modal/Feature Flags" ... > in the mdx file
 */

const toggleButton = () => {
  document.querySelector('cds-modal')?.toggleAttribute('open');
};

const sizes = {
  [`Extra small size (${MODAL_SIZE.EXTRA_SMALL})`]: MODAL_SIZE.EXTRA_SMALL,
  [`Small size (${MODAL_SIZE.SMALL})`]: MODAL_SIZE.SMALL,
  [`Medium size (${MODAL_SIZE.MEDIUM})`]: MODAL_SIZE.MEDIUM,
  [`Large size (${MODAL_SIZE.LARGE})`]: MODAL_SIZE.LARGE,
};

const buttons = {
  'One (1)': 1,
  'Two (2)': 2,
  'Three (3)': 3,
};

const defaultArgs = {
  alert: false,
  ariaLabel: '',
  closeButtonLabel: 'Close',
  danger: false,
  fullWidth: false,
  modalHeading: 'Add a custom domain',
  modalLabel: 'Account resources',
  numberOfButtons: 2,
  open: true,
  passiveModal: false,
  preventCloseOnClickOutside: true,
  primaryButtonDisabled: false,
  size: MODAL_SIZE.MEDIUM,
};

const controls = {
  alert: {
    control: 'boolean',
    description:
      'Specify whether the Modal is displaying an alert, error or warning Should go hand in hand with the danger prop.',
  },
  ariaLabel: {
    control: 'text',
    description: 'Required props for the accessibility label of the header.',
  },
  closeButtonLabel: {
    control: 'text',
    description: 'The label of the close button',
  },
  danger: {
    control: 'boolean',
    description: 'Specify whether the Modal is for dangerous actions.',
  },
  fullWidth: {
    control: 'boolean',
    description:
      'Specify whether or not the Modal content should have any inner padding.',
  },
  modalHeading: {
    control: 'text',
    description: 'Specify the content of the modal header title.',
  },
  modalLabel: {
    control: 'text',
    description: 'Specify the content of the modal header label.',
  },
  numberOfButtons: {
    control: 'radio',
    description: 'Count of Footer Buttons',
    options: buttons,
  },
  open: {
    control: 'boolean',
    description: 'Specify whether the modal is currently open.',
  },
  passiveModal: {
    control: 'boolean',
    description:
      'Specify whether the Modal is a passive modal (no footer) or not.',
  },
  preventCloseOnClickOutside: {
    control: 'boolean',
    description: 'Prevent closing on click outside of modal.',
  },
  primaryButtonDisabled: {
    control: 'boolean',
    description: 'Specify whether the primary button should be disabled.',
  },
  size: {
    control: 'select',
    description: 'Specify the size variant.',
    options: sizes,
  },
};

export const EnableDialogElement = {
  name: 'enable-dialog-element',
  args: defaultArgs,
  argTypes: controls,
  parameters: {
    docs: {
      page: mdx,
    },
  },
  tags: ['!autodocs'],
  render: (args) => {
    const {
      alert,
      ariaLabel,
      danger,
      open,
      closeButtonLabel,
      fullWidth,
      modalHeading,
      modalLabel,
      numberOfButtons,
      passiveModal,
      preventCloseOnClickOutside,
      primaryButtonDisabled,
      size,
    } = args ?? {};
    return html`
      <sb-template-feature-flags>
        <feature-flags enable-dialog-element>
          <cds-modal
            aria-label=${ariaLabel}
            ?prevent-close-on-click-outside=${preventCloseOnClickOutside}
            ?alert=${alert}
            size=${size}
            ?open=${open}
            ?full-width=${fullWidth}>
            <cds-modal-header>
              <cds-modal-close-button
                close-button-label=${closeButtonLabel}></cds-modal-close-button>
              ${modalLabel &&
              html`<cds-modal-label>${modalLabel}</cds-modal-label>`}
              <cds-modal-heading>${modalHeading}</cds-modal-heading>
            </cds-modal-header>
            <cds-modal-body>
              <cds-modal-body-content description>
                Custom domains direct requests for your apps in this Cloud
                Foundry organization to a URL that you own. A custom domain can
                be a shared domain, a shared subdomain, or a shared domain and
                host.
              </cds-modal-body-content>
              <div style="margin-bottom: 24px;">
                <cds-text-input
                  data-modal-primary-focus
                  placeholder="e.g. github.com"
                  label="Domain name">
                </cds-text-input>
              </div>
              <cds-select label-text="Region" placeholder="US South">
                <cds-select-item value="us-south">US South</cds-select-item>
                <cds-select-item value="us-east">US East</cds-select-item>
              </cds-select>
            </cds-modal-body>
            ${passiveModal
              ? ``
              : html` <cds-modal-footer>
                  ${numberOfButtons > 2
                    ? html` <cds-modal-footer-button kind="secondary"
                        >Keep both</cds-modal-footer-button
                      >`
                    : ``}
                  ${numberOfButtons >= 2
                    ? html` <cds-modal-footer-button
                        kind="secondary"
                        ?data-modal-close=${numberOfButtons === 2}
                        >${numberOfButtons === 2
                          ? html`Cancel`
                          : 'Rename'}</cds-modal-footer-button
                      >`
                    : ``}

                  <cds-modal-footer-button
                    ?disabled=${primaryButtonDisabled}
                    kind="${danger ? 'danger' : 'primary'}"
                    >Add</cds-modal-footer-button
                  >
                </cds-modal-footer>`}
          </cds-modal>
        </feature-flags>
        <cds-button @click=${toggleButton}>Launch modal</cds-button>
      </sb-template-feature-flags>
    `;
  },
};

const meta = {
  title: 'Components/Modal/Feature Flag',
};

export default meta;
