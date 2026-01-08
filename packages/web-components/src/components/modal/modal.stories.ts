/**
 * Copyright IBM Corp. 2019, 2023
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import '../structured-list';
import { MODAL_SIZE } from './modal';
import { iconLoader } from '../../globals/internal/icon-loader';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import './index';
import '../ai-label';
import '../icon-button';
import '../form';
import '../select';
import '../textarea';
import '../combo-box';
import '../checkbox';
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
  hasScrollingContent: false,
  modalHeading: 'Add a custom domain',
  modalLabel: '',
  numberOfButtons: 2,
  open: true,
  passiveModal: false,
  preventCloseOnClickOutside: true,
  primaryButtonDisabled: false,
  size: null,
  loadingStatus: 'inactive',
  loadingDescription: '',
  loadingIconDescription: 'Loading',
  shouldSubmitOnEnter: false,
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
    description: 'Required props for the accessibility label of the header.',
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
  hasScrollingContent: {
    control: 'boolean',
    description: 'Specify whether the modal contains scrolling content.',
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
    description: 'Specify whether the Modal should be passive, or not.',
  },
  preventCloseOnClickOutside: {
    control: 'boolean',
    description: 'Prevent close on click outside.',
  },
  primaryButtonDisabled: {
    control: 'boolean',
    description: 'Primary button disabled.',
  },
  size: {
    control: 'select',
    description: 'Modal size.',
    options: sizes,
  },
  loadingStatus: {
    control: 'radio',
    description: 'Specify loading status',
    options: ['inactive', 'active', 'finished', 'error'],
  },
  loadingIconDescription: {
    description: 'Specify the description for the loading icon',
  },
  loadingDescription: {
    description: 'Specify the description for the loading text',
  },
  shouldSubmitOnEnter: {
    description:
      'Specify if Enter key should be used as "submit" action that clicks the primary footer button',
  },
};

export const Default = {
  args: defaultArgs,
  argTypes: controls,
  render: ({
    alert,
    ariaLabel,
    danger,
    open,
    closeButtonLabel,
    hasScrollingContent,
    fullWidth,
    modalHeading,
    modalLabel,
    numberOfButtons,
    passiveModal,
    preventCloseOnClickOutside,
    primaryButtonDisabled,
    size,
    loadingDescription,
    loadingStatus,
    loadingIconDescription,
    shouldSubmitOnEnter,
  }) => html`
    <cds-modal
      aria-label=${ariaLabel}
      ?prevent-close-on-click-outside=${preventCloseOnClickOutside}
      ?alert=${alert}
      size="${size}"
      ?open=${open}
      ?full-width=${fullWidth}
      ?has-scrolling-content="${hasScrollingContent}"
      loading-description="${loadingDescription}"
      loading-status="${loadingStatus}"
      loading-icon-description="${loadingIconDescription}"
      ?should-submit-on-enter="${shouldSubmitOnEnter}">
      <cds-modal-header>
        <cds-modal-close-button
          close-button-label=${closeButtonLabel}></cds-modal-close-button>
        ${modalLabel && html`<cds-modal-label>${modalLabel}</cds-modal-label>`}
        <cds-modal-heading>${modalHeading}</cds-modal-heading>
      </cds-modal-header>
      <cds-modal-body>
        <cds-modal-body-content description>
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </cds-modal-body-content>
        <div style="margin-bottom: 24px;">
          <cds-text-input
            data-modal-primary-focus
            placeholder="For example, GitHub.com"
            label="Domain name">
          </cds-text-input>
        </div>
        <div style="margin-bottom: 24px;">
          <cds-select placeholder="US South" label-text="Region">
            <cds-select-item value="us-south">US South</cds-select-item>
            <cds-select-item value="us-east">US East</cds-select-item>
          </cds-select>
        </div>
        <div style="margin-bottom: 24px;">
          <cds-combo-box
            autoalign
            title-text="Permissions (Example of Floating UI)">
            <cds-combo-box-item value="viewer">Viewer</cds-combo-box-item>
            <cds-combo-box-item value="editor">Editor</cds-combo-box-item>
            <cds-combo-box-item value="manager">Manager</cds-combo-box-item>
          </cds-combo-box>
        </div>
        <div style="margin-bottom: 24px;">
          <cds-dropdown
            autoalign
            label="Option 1"
            title-text="TLS (Example of Floating UI)">
            <cds-dropdown-item value="1.0">1.0</cds-dropdown-item>
            <cds-dropdown-item value="1.1">1.1</cds-dropdown-item>
            <cds-dropdown-item value="1.2">1.2</cds-dropdown-item>
          </cds-dropdown>
        </div>
        <div style="margin-bottom: 24px;">
          <cds-multi-select label="Choose Options" title-text="Mapping Domain">
            <cds-multi-select-item value="cloud-foundry"
              >Cloud Foundry</cds-multi-select-item
            >
            <cds-multi-select-item value="kubernetes-ingress"
              >Kubernetes Ingress</cds-multi-select-item
            >
            <cds-multi-select-item value="vpc-load-balancer"
              >VPC Load Balancer</cds-multi-select-item
            >
          </cds-multi-select>
        </div>
        <div style="margin-bottom: 24px;">
          <cds-checkbox-group legend-text="Terms of Agreement">
            <cds-checkbox id="checkbox-label-1"
              >I confirm domain ownership and accept IBM service terms and
              applicable charges</cds-checkbox
            >
          </cds-checkbox-group>
        </div>
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
              ? html` <cds-modal-footer-button kind="secondary"
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
    <cds-button @click="${toggleButton}">Launch modal</cds-button>
  `,
};

export const DangerModal = {
  args: {
    ...defaultArgs,
    danger: true,
    modalHeading: 'Are you sure you want to delete this custom domain?',
    modalLabel: 'Account resources',
  },
  argTypes: controls,
  render: ({
    alert,
    ariaLabel,
    danger,
    open,
    closeButtonLabel,
    hasScrollingContent,
    fullWidth,
    modalHeading,
    modalLabel,
    numberOfButtons,
    passiveModal,
    preventCloseOnClickOutside,
    primaryButtonDisabled,
    size,
    loadingDescription,
    loadingStatus,
    loadingIconDescription,
    shouldSubmitOnEnter,
  }) => html`
    <cds-modal
      aria-label=${ariaLabel}
      ?prevent-close-on-click-outside=${preventCloseOnClickOutside}
      ?alert=${alert}
      size="${size}"
      ?open=${open}
      ?full-width=${fullWidth}
      ?has-scrolling-content="${hasScrollingContent}"
      loading-description="${loadingDescription}"
      loading-status="${loadingStatus}"
      loading-icon-description="${loadingIconDescription}"
      ?should-submit-on-enter="${shouldSubmitOnEnter}">
      <cds-modal-header>
        <cds-modal-close-button
          close-button-label=${closeButtonLabel}></cds-modal-close-button>
        ${modalLabel && html`<cds-modal-label>${modalLabel}</cds-modal-label>`}
        <cds-modal-heading>${modalHeading}</cds-modal-heading>
      </cds-modal-header>
      <cds-modal-body>
        <cds-modal-body-content>
          Check for dependencies on the domain before deletion. For instance, if
          the domain is used as a primary domain for users or if it's associated
          with critical applications or services, those connections will need to
          be removed or reconfigured first.
        </cds-modal-body-content></cds-modal-body
      >

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
              >Delete</cds-modal-footer-button
            >
          </cds-modal-footer>`}
    </cds-modal>
    <cds-button @click="${toggleButton}">Launch modal</cds-button>
  `,
};

export const FullWidth = {
  args: {
    ...defaultArgs,
    fullWidth: true,
    modalHeading: 'Full width modal',
    modalLabel: 'An example of a modal with no padding',
  },
  argTypes: controls,
  render: ({
    alert,
    ariaLabel,
    danger,
    open,
    closeButtonLabel,
    hasScrollingContent,
    fullWidth,
    modalHeading,
    modalLabel,
    numberOfButtons,
    passiveModal,
    preventCloseOnClickOutside,
    primaryButtonDisabled,
    size,
    loadingDescription,
    loadingStatus,
    loadingIconDescription,
    shouldSubmitOnEnter,
  }) => html`
    <cds-modal
      aria-label=${ariaLabel}
      ?prevent-close-on-click-outside=${preventCloseOnClickOutside}
      ?alert=${alert}
      size="${size}"
      ?open=${open}
      ?full-width=${fullWidth}
      ?has-scrolling-content="${hasScrollingContent}"
      loading-description="${loadingDescription}"
      loading-status="${loadingStatus}"
      loading-icon-description="${loadingIconDescription}"
      ?should-submit-on-enter="${shouldSubmitOnEnter}">
      <cds-modal-header>
        <cds-modal-close-button
          close-button-label=${closeButtonLabel}></cds-modal-close-button>
        ${modalLabel && html`<cds-modal-label>${modalLabel}</cds-modal-label>`}
        <cds-modal-heading>${modalHeading}</cds-modal-heading>
      </cds-modal-header>
      <cds-modal-body>
        <div style="margin-bottom: 48px;">
          <cds-structured-list>
            <cds-structured-list-head>
              <cds-structured-list-header-row>
                <cds-structured-list-header-cell
                  >Default size</cds-structured-list-header-cell
                >
                <cds-structured-list-header-cell
                  >Features</cds-structured-list-header-cell
                >
                <cds-structured-list-header-cell
                  >Pricing</cds-structured-list-header-cell
                >
              </cds-structured-list-header-row>
            </cds-structured-list-head>
            <cds-structured-list-body>
              <cds-structured-list-row>
                <cds-structured-list-cell>Lite</cds-structured-list-cell>
                <cds-structured-list-cell
                  >2 vCPUs | 4GB RAM</cds-structured-list-cell
                >
                <cds-structured-list-cell
                  >$0.12 USD / hourly
                </cds-structured-list-cell>
              </cds-structured-list-row>
              <cds-structured-list-row>
                <cds-structured-list-cell
                  >Graduated tier</cds-structured-list-cell
                >
                <cds-structured-list-cell
                  >2 vCPUs | 8GB RAM</cds-structured-list-cell
                >
                <cds-structured-list-cell
                  >$0.13 USD / hourly
                </cds-structured-list-cell>
              </cds-structured-list-row>
              <cds-structured-list-row>
                <cds-structured-list-cell>Premium</cds-structured-list-cell>
                <cds-structured-list-cell
                  >4 vCPUs | 10GB RAM</cds-structured-list-cell
                >
                <cds-structured-list-cell
                  >$0.20 USD / hourly
                </cds-structured-list-cell>
              </cds-structured-list-row>
            </cds-structured-list-body>
          </cds-structured-list>
        </div>
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
    <cds-button @click="${toggleButton}">Launch modal</cds-button>
  `,
};

export const PassiveModal = {
  args: {
    ...defaultArgs,
    passiveModal: true,
    modalHeading: 'You are now signed out.',
  },
  argTypes: controls,
  parameters: {
    controls: {
      include: [
        'ariaLabel',
        'closeButtonLabel',
        'hasScrollingContent',
        'fullWidth',
        'modalHeading',
        'modalLabel',
        'open',
        'preventCloseOnClickOutside',
        'size',
      ],
    },
  },
  render: ({
    ariaLabel,
    open,
    closeButtonLabel,
    hasScrollingContent,
    fullWidth,
    modalHeading,
    modalLabel,
    preventCloseOnClickOutside,
    size,
  }) => html`
    <cds-modal
      aria-label=${ariaLabel}
      ?prevent-close-on-click-outside=${preventCloseOnClickOutside}
      size="${size}"
      ?open=${open}
      ?full-width=${fullWidth}
      ?has-scrolling-content="${hasScrollingContent}">
      <cds-modal-header>
        <cds-modal-close-button
          close-button-label=${closeButtonLabel}></cds-modal-close-button>
        ${modalLabel && html`<cds-modal-label>${modalLabel}</cds-modal-label>`}
        <cds-modal-heading>${modalHeading}</cds-modal-heading>
      </cds-modal-header>
      <cds-modal-body></cds-modal-body>
    </cds-modal>
    <cds-button @click="${toggleButton}">Launch modal</cds-button>
  `,
};

export const WithAILabel = {
  args: {
    ...defaultArgs,
    modalLabel: 'Account Resources',
  },
  argTypes: controls,
  render: ({
    alert,
    ariaLabel,
    danger,
    open,
    closeButtonLabel,
    hasScrollingContent,
    fullWidth,
    modalHeading,
    modalLabel,
    numberOfButtons,
    passiveModal,
    preventCloseOnClickOutside,
    primaryButtonDisabled,
    size,
    loadingDescription,
    loadingStatus,
    loadingIconDescription,
    shouldSubmitOnEnter,
  }) => html`
    <cds-modal
      aria-label=${ariaLabel}
      ?prevent-close-on-click-outside=${preventCloseOnClickOutside}
      ?alert=${alert}
      size="${size}"
      ?open=${open}
      ?full-width=${fullWidth}
      ?has-scrolling-content="${hasScrollingContent}"
      loading-description="${loadingDescription}"
      loading-status="${loadingStatus}"
      loading-icon-description="${loadingIconDescription}"
      ?should-submit-on-enter="${shouldSubmitOnEnter}">
      <cds-modal-header>
        <cds-modal-close-button
          close-button-label=${closeButtonLabel}></cds-modal-close-button>
        <cds-ai-label alignment="bottom-end">
          ${content}${actions}</cds-ai-label
        >
        ${modalLabel && html`<cds-modal-label>${modalLabel}</cds-modal-label>`}
        <cds-modal-heading>${modalHeading}</cds-modal-heading>
      </cds-modal-header>
      <cds-modal-body>
        <cds-modal-body-content description style="margin-bottom: 2rem;">
          Custom domains direct requests for your apps in this Cloud Foundry
          organization to a URL that you own. A custom domain can be a shared
          domain, a shared subdomain, or a shared domain and host.
        </cds-modal-body-content>

        <div style="margin-bottom: 24px">
          <cds-text-input
            data-modal-primary-focus
            placeholder="For example, GitHub.com"
            label="Domain name">
          </cds-text-input>
        </div>
        <div style="margin-bottom: 24px">
          <cds-select placeholder="US South" label-text="Region">
            <cds-select-item value="us-south">US South</cds-select-item>
            <cds-select-item value="us-east">US East</cds-select-item>
          </cds-select>
        </div>
        <cds-textarea label="Comments"></cds-textarea>
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
    <cds-button @click="${toggleButton}">Launch modal</cds-button>
  `,
};

export const WithInlineLoading = {
  args: {
    ...defaultArgs,
    danger: true,
    modalHeading: 'Are you sure you want to delete this custom domain?',
    modalLabel: 'Account resources',
  },
  argTypes: controls,
  parameters: {
    controls: {
      exclude: [
        'loadingStatus',
        'loadingDescription',
        'numberOfButtons',
        'loadingIconDescription',
      ],
    },
  },
  render: (args) => {
    const {
      alert,
      ariaLabel,
      danger,
      open,
      closeButtonLabel,
      hasScrollingContent,
      fullWidth,
      modalHeading,
      modalLabel,
      passiveModal,
      preventCloseOnClickOutside,
      primaryButtonDisabled,
      size,
      shouldSubmitOnEnter,
    } = args ?? {};
    const onDelete = () => {
      const modal = document.querySelector('cds-modal') as HTMLElement;
      if (!modal) return;
      // Start loading
      modal.setAttribute('loading-status', 'active');

      // Simulate work
      setTimeout(() => {
        modal.setAttribute('loading-description', 'Deleted!');
        modal.setAttribute('loading-status', 'finished');
      }, 2000);
    };

    // Reset the loading description and status once finished successfully
    const onSuccess = () => {
      const modal = document.querySelector('cds-modal') as HTMLElement;
      modal.setAttribute('loading-description', 'Deleting...');
      modal.setAttribute('loading-status', 'inactive');
    };

    return html`
      <cds-modal
        aria-label=${ariaLabel}
        ?prevent-close-on-click-outside=${preventCloseOnClickOutside}
        ?alert=${alert}
        size="${size}"
        ?open=${open}
        ?full-width=${fullWidth}
        ?has-scrolling-content="${hasScrollingContent}"
        ?should-submit-on-enter="${shouldSubmitOnEnter}"
        loading-status="inactive"
        loading-description="Deleting..."
        @cds-modal-on-loadingsuccess=${onSuccess}>
        <cds-modal-header>
          <cds-modal-close-button
            close-button-label=${closeButtonLabel}></cds-modal-close-button>
          ${modalLabel &&
          html`<cds-modal-label>${modalLabel}</cds-modal-label>`}
          <cds-modal-heading>${modalHeading}</cds-modal-heading>
        </cds-modal-header>
        <cds-modal-body></cds-modal-body>

        ${passiveModal
          ? html``
          : html` <cds-modal-footer>
              <cds-modal-footer-button
                id="cancel"
                kind="secondary"
                data-modal-close
                >Cancel</cds-modal-footer-button
              >
              <cds-modal-footer-button
                ?disabled=${primaryButtonDisabled}
                kind="${danger ? 'danger' : 'primary'}"
                id="submit"
                @click=${onDelete}
                >Delete</cds-modal-footer-button
              >
            </cds-modal-footer>`}
      </cds-modal>
      <cds-button @click="${toggleButton}">Launch modal</cds-button>
    `;
  },
};

export const WithScrollingContent = {
  args: {
    ...defaultArgs,
    modalLabel: 'Account Resources',
    hasScrollingContent: true,
  },
  argTypes: controls,
  render: (args) => {
    const {
      alert,
      ariaLabel,
      danger,
      open,
      closeButtonLabel,
      hasScrollingContent,
      fullWidth,
      modalHeading,
      modalLabel,
      numberOfButtons,
      passiveModal,
      preventCloseOnClickOutside,
      primaryButtonDisabled,
      size,
      loadingDescription,
      loadingStatus,
      loadingIconDescription,
      shouldSubmitOnEnter,
    } = args ?? {};

    return html`
      <cds-modal
        aria-label=${ariaLabel}
        ?prevent-close-on-click-outside=${preventCloseOnClickOutside}
        ?alert=${alert}
        size="${size}"
        ?open=${open}
        ?full-width=${fullWidth}
        ?has-scrolling-content="${hasScrollingContent}"
        loading-description="${loadingDescription}"
        loading-status="${loadingStatus}"
        loading-icon-description="${loadingIconDescription}"
        ?should-submit-on-enter="${shouldSubmitOnEnter}">
        <cds-modal-header>
          <cds-modal-close-button
            close-button-label=${closeButtonLabel}></cds-modal-close-button>
          ${modalLabel &&
          html`<cds-modal-label>${modalLabel}</cds-modal-label>`}
          <cds-modal-heading>${modalHeading}</cds-modal-heading>
        </cds-modal-header>
        <cds-modal-body>
          <cds-modal-body-content description>
            Custom domains direct requests for your apps in this Cloud Foundry
            organization to a URL that you own. A custom domain can be a shared
            domain, a shared subdomain, or a shared domain and host.
          </cds-modal-body-content>
          <cds-modal-body-content description style="margin-bottom: 2rem;">
            Domain mappings provide the URL route to your Code Engine
            application or function within a project. With Code Engine, these
            mappings are automatically created, by default, whenever you deploy
            an application or create a function. However, you can map your own
            custom domain to a Code Engine application or function. This option
            routes requests from your custom URL to your application or
            function. You can use the Code Engine CLI.
          </cds-modal-body-content>

          <div style="margin-bottom: 24px;">
            <cds-text-input
              data-modal-primary-focus
              placeholder="For example, GitHub.com"
              label="Domain name">
            </cds-text-input>
          </div>
          <div style="margin-bottom: 24px;">
            <cds-select label-text="Domain name" placeholder="US South">
              <cds-select-item value="us-south">Option 1</cds-select-item>
              <cds-select-item value="us-east">Option 2</cds-select-item>
            </cds-select>
          </div>
          <div style="margin-bottom: 24px;">
            <cds-combo-box
              autoalign
              title-text="Permissions (Example of Floating UI)">
              <cds-combo-box-item value="viewer">Viewer</cds-combo-box-item>
              <cds-combo-box-item value="editor">Editor</cds-combo-box-item>
              <cds-combo-box-item value="manager">Manager</cds-combo-box-item>
            </cds-combo-box>
          </div>
          <div style="margin-bottom: 24px;">
            <cds-multi-select
              label="Choose Options"
              title-text="Mapping Domain">
              <cds-multi-select-item value="cloud-foundry"
                >Cloud Foundry</cds-multi-select-item
              >
              <cds-multi-select-item value="kubernetes-ingress"
                >Kubernetes Ingress</cds-multi-select-item
              >
              <cds-multi-select-item value="vpc-load-balancer"
                >VPC Load Balancer</cds-multi-select-item
              >
            </cds-multi-select>
          </div>
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
      <cds-button @click="${toggleButton}">Launch modal</cds-button>
    `;
  },
};

export const WithStateManager = {
  args: {
    ...defaultArgs,
    modalLabel: 'Account Resources',
    open: false,
  },
  argTypes: controls,
  render: (args) => {
    const {
      alert,
      ariaLabel,
      danger,
      open,
      closeButtonLabel,
      hasScrollingContent,
      fullWidth,
      modalHeading,
      modalLabel,
      numberOfButtons,
      passiveModal,
      preventCloseOnClickOutside,
      primaryButtonDisabled,
      size,
      loadingDescription,
      loadingStatus,
      loadingIconDescription,
      shouldSubmitOnEnter,
    } = args ?? {};

    return html`
      <cds-modal
        aria-label=${ariaLabel}
        ?prevent-close-on-click-outside=${preventCloseOnClickOutside}
        ?alert=${alert}
        size="${size}"
        ?open=${open}
        ?full-width=${fullWidth}
        ?has-scrolling-content="${hasScrollingContent}"
        loading-description="${loadingDescription}"
        loading-status="${loadingStatus}"
        loading-icon-description="${loadingIconDescription}"
        ?should-submit-on-enter="${shouldSubmitOnEnter}">
        <cds-modal-header>
          <cds-modal-close-button
            close-button-label=${closeButtonLabel}></cds-modal-close-button>
          ${modalLabel &&
          html`<cds-modal-label>${modalLabel}</cds-modal-label>`}
          <cds-modal-heading>${modalHeading}</cds-modal-heading>
        </cds-modal-header>
        <cds-modal-body>
          <cds-modal-body-content description>
            Custom domains direct requests for your apps in this Cloud Foundry
            organization to a URL that you own. A custom domain can be a shared
            domain, a shared subdomain, or a shared domain and host.
          </cds-modal-body-content>
          <div style="margin-bottom: 24px;">
            <cds-text-input
              data-modal-primary-focus
              placeholder="e.g. github.com"
              label="Domain name">
            </cds-text-input>
          </div>
          <cds-select label-text="Domain name" placeholder="US South">
            <cds-select-item value="us-south">Option 1</cds-select-item>
            <cds-select-item value="us-east">Option 2</cds-select-item>
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
      <cds-button @click="${toggleButton}">Launch modal</cds-button>
    `;
  },
};

const content = html`
  <div slot="body-text">
    <p class="secondary">AI Explained</p>
    <h2 class="ai-label-heading">84%</h2>
    <p class="secondary bold">Confidence score</p>
    <p class="secondary">
      Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.
    </p>
    <hr />
    <p class="secondary">Model type</p>
    <p class="bold">Foundation model</p>
  </div>
`;

const actions = html`
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(View16, { slot: 'icon' })}
    <span slot="tooltip-content"> View </span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(FolderOpen16, { slot: 'icon' })}
    <span slot="tooltip-content"> Open folder</span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(Folders16, { slot: 'icon' })}
    <span slot="tooltip-content"> Folders </span>
  </cds-icon-button>
  <cds-ai-label-action-button>View details</cds-ai-label-action-button>
`;

const meta = {
  title: 'Components/Modal',
};

export default meta;
