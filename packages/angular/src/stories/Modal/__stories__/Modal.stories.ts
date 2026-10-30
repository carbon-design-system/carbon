/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { NgIf } from '@angular/common';
import {
  moduleMetadata,
  type Meta,
  type StoryObj,
  type ArgTypes,
} from '@storybook/angular';
import { fn } from 'storybook/test';
import {
  ModalBodyComponent,
  ModalBodyContentComponent,
  ModalCloseButtonComponent,
  ModalComponent,
  ModalFooterButtonComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalHeadingComponent,
  ModalLabelComponent,
} from '@carbon/angular/modal';
import {
  AiLabelComponent,
  AiLabelActionButtonComponent,
} from '@carbon/angular/ai-label';

// ─── WC-parity stories (one-for-one with @carbon/web-components Modal) ────────

const modalImports = [
  ModalComponent,
  ModalBodyComponent,
  ModalBodyContentComponent,
  ModalCloseButtonComponent,
  ModalFooterButtonComponent,
  ModalFooterComponent,
  ModalHeaderComponent,
  ModalHeadingComponent,
  ModalLabelComponent,
];

const numberOfButtonsOptions = [1, 2, 3];
const numberOfButtonsLabels: Record<string, string> = {
  1: 'One (1)',
  2: 'Two (2)',
  3: 'Three (3)',
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
  size: 'md',
  loadingStatus: 'inactive',
  loadingDescription: '',
  loadingIconDescription: 'Loading',
  shouldSubmitOnEnter: false,
};

const controls: ArgTypes = {
  alert: {
    control: 'boolean',
    description:
      'Specify whether the Modal is displaying an alert, error or warning. Should go hand in hand with the danger prop.',
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
    options: numberOfButtonsOptions,
    labels: numberOfButtonsLabels,
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
    options: ['xs', 'sm', 'md', 'lg'],
    labels: {
      xs: 'Extra small (xs)',
      sm: 'Small (sm)',
      md: 'Medium (md)',
      lg: 'Large (lg)',
    },
    description: 'Modal size.',
  },
  loadingStatus: {
    control: 'radio',
    description: 'Specify loading status',
    options: ['inactive', 'active', 'finished', 'error'],
  },
  loadingIconDescription: {
    control: 'text',
    description: 'Specify the description for the loading icon',
  },
  loadingDescription: {
    control: 'text',
    description: 'Specify the description for the loading text',
  },
  shouldSubmitOnEnter: {
    control: 'boolean',
    description:
      'Specify if Enter key should be used as "submit" action that clicks the primary footer button',
  },
};

// AI label content / actions shared across Modal WithAILabel story
const aiLabelContent = `
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

const aiLabelActions = `<cds-ng-ai-label-action-button>View details</cds-ng-ai-label-action-button>`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const meta: Meta<any> = {
  title: 'Components/Modal',
  // Storybook for Angular drops args that have no `action` or `control`
  // argType before rendering, so the output handlers need one.
  args: { modalClosed: fn(), modalBeingclosed: fn() },
  argTypes: {
    modalClosed: { action: 'modalClosed' },
    modalBeingclosed: { action: 'modalBeingclosed' },
  },
  decorators: [
    moduleMetadata({
      imports: [
        ...modalImports,
        AiLabelComponent,
        AiLabelActionButtonComponent,
        NgIf,
      ],
    }),
  ],
};

export default meta;
type Story = StoryObj<Record<string, unknown>>;

// WC: Default
export const Default: Story = {
  args: defaultArgs,
  argTypes: controls,
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-modal
        [alert]="alert"
        [aria-label]="ariaLabel"
        [danger]="danger"
        [open]="open"
        [fullWidth]="fullWidth"
        [hasScrollingContent]="hasScrollingContent"
        [preventCloseOnClickOutside]="preventCloseOnClickOutside"
        [size]="size"
        (modalClosed)="modalClosed($event)"
        (modalBeingclosed)="modalBeingclosed($event)"
      >
        <cds-ng-modal-header>
          <cds-ng-modal-close-button [closeButtonLabel]="closeButtonLabel"></cds-ng-modal-close-button>
          <cds-ng-modal-label *ngIf="modalLabel">{{modalLabel}}</cds-ng-modal-label>
          <cds-ng-modal-heading>{{modalHeading}}</cds-ng-modal-heading>
        </cds-ng-modal-header>
        <cds-ng-modal-body>
          <cds-ng-modal-body-content description>
            Custom domains direct requests for your apps in this Cloud Foundry
            organization to a URL that you own. A custom domain can be a shared
            domain, a shared subdomain, or a shared domain and host.
          </cds-ng-modal-body-content>
        </cds-ng-modal-body>
        <cds-ng-modal-footer *ngIf="!passiveModal">
          <cds-ng-modal-footer-button *ngIf="numberOfButtons > 2" kind="secondary">Keep both</cds-ng-modal-footer-button>
          <cds-ng-modal-footer-button *ngIf="numberOfButtons >= 2" kind="secondary">
            {{ numberOfButtons === 2 ? 'Cancel' : 'Rename' }}
          </cds-ng-modal-footer-button>
          <cds-ng-modal-footer-button [disabled]="primaryButtonDisabled" [kind]="danger ? 'danger' : 'primary'">Add</cds-ng-modal-footer-button>
        </cds-ng-modal-footer>
      </cds-ng-modal>
    `,
  }),
};

// WC: DangerModal
export const DangerModal: Story = {
  args: {
    ...defaultArgs,
    danger: true,
    modalHeading: 'Are you sure you want to delete this custom domain?',
    modalLabel: 'Account resources',
  },
  argTypes: controls,
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-modal
        [alert]="alert"
        [aria-label]="ariaLabel"
        [danger]="danger"
        [open]="open"
        [fullWidth]="fullWidth"
        [hasScrollingContent]="hasScrollingContent"
        [preventCloseOnClickOutside]="preventCloseOnClickOutside"
        [size]="size"
        (modalClosed)="modalClosed($event)"
      >
        <cds-ng-modal-header>
          <cds-ng-modal-close-button [closeButtonLabel]="closeButtonLabel"></cds-ng-modal-close-button>
          <cds-ng-modal-label *ngIf="modalLabel">{{modalLabel}}</cds-ng-modal-label>
          <cds-ng-modal-heading>{{modalHeading}}</cds-ng-modal-heading>
        </cds-ng-modal-header>
        <cds-ng-modal-body>
          <cds-ng-modal-body-content>
            Check for dependencies on the domain before deletion. For instance, if
            the domain is used as a primary domain for users or if it's associated
            with critical applications or services, those connections will need to
            be removed or reconfigured first.
          </cds-ng-modal-body-content>
        </cds-ng-modal-body>
        <cds-ng-modal-footer *ngIf="!passiveModal">
          <cds-ng-modal-footer-button *ngIf="numberOfButtons > 2" kind="secondary">Keep both</cds-ng-modal-footer-button>
          <cds-ng-modal-footer-button *ngIf="numberOfButtons >= 2" kind="secondary">
            {{ numberOfButtons === 2 ? 'Cancel' : 'Rename' }}
          </cds-ng-modal-footer-button>
          <cds-ng-modal-footer-button [disabled]="primaryButtonDisabled" [kind]="danger ? 'danger' : 'primary'">Delete</cds-ng-modal-footer-button>
        </cds-ng-modal-footer>
      </cds-ng-modal>
    `,
  }),
};

// WC: FullWidth
export const FullWidth: Story = {
  args: {
    ...defaultArgs,
    fullWidth: true,
    modalHeading: 'Full width modal',
    modalLabel: 'An example of a modal with no padding',
  },
  argTypes: controls,
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-modal
        [fullWidth]="fullWidth"
        [open]="open"
        [preventCloseOnClickOutside]="preventCloseOnClickOutside"
        [size]="size"
        (modalClosed)="modalClosed($event)"
      >
        <cds-ng-modal-header>
          <cds-ng-modal-close-button [closeButtonLabel]="closeButtonLabel"></cds-ng-modal-close-button>
          <cds-ng-modal-label *ngIf="modalLabel">{{modalLabel}}</cds-ng-modal-label>
          <cds-ng-modal-heading>{{modalHeading}}</cds-ng-modal-heading>
        </cds-ng-modal-header>
        <cds-ng-modal-body>
          <cds-ng-modal-body-content description>
            Full-width modal body content. No inner padding on body or footer.
          </cds-ng-modal-body-content>
        </cds-ng-modal-body>
        <cds-ng-modal-footer *ngIf="!passiveModal">
          <cds-ng-modal-footer-button *ngIf="numberOfButtons > 2" kind="secondary">Keep both</cds-ng-modal-footer-button>
          <cds-ng-modal-footer-button *ngIf="numberOfButtons >= 2" kind="secondary">
            {{ numberOfButtons === 2 ? 'Cancel' : 'Rename' }}
          </cds-ng-modal-footer-button>
          <cds-ng-modal-footer-button [disabled]="primaryButtonDisabled" kind="primary">Add</cds-ng-modal-footer-button>
        </cds-ng-modal-footer>
      </cds-ng-modal>
    `,
  }),
};

// WC: PassiveModal
export const PassiveModal: Story = {
  args: {
    ...defaultArgs,
    passiveModal: true,
    modalHeading: 'You are now signed out.',
    modalLabel: '',
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
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-modal
        [aria-label]="ariaLabel"
        [preventCloseOnClickOutside]="preventCloseOnClickOutside"
        [size]="size"
        [open]="open"
        [fullWidth]="fullWidth"
        [hasScrollingContent]="hasScrollingContent"
        (modalClosed)="modalClosed($event)"
      >
        <cds-ng-modal-header>
          <cds-ng-modal-close-button [closeButtonLabel]="closeButtonLabel"></cds-ng-modal-close-button>
          <cds-ng-modal-label *ngIf="modalLabel">{{modalLabel}}</cds-ng-modal-label>
          <cds-ng-modal-heading>{{modalHeading}}</cds-ng-modal-heading>
        </cds-ng-modal-header>
        <cds-ng-modal-body></cds-ng-modal-body>
      </cds-ng-modal>
    `,
  }),
};

// WC: WithAILabel
export const WithAILabel: Story = {
  args: {
    ...defaultArgs,
    modalLabel: 'Account Resources',
  },
  argTypes: controls,
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-modal
        [alert]="alert"
        [aria-label]="ariaLabel"
        [danger]="danger"
        [open]="open"
        [fullWidth]="fullWidth"
        [hasScrollingContent]="hasScrollingContent"
        [preventCloseOnClickOutside]="preventCloseOnClickOutside"
        [size]="size"
        [loadingDescription]="loadingDescription"
        [loadingStatus]="loadingStatus"
        [loadingIconDescription]="loadingIconDescription"
        [shouldSubmitOnEnter]="shouldSubmitOnEnter"
        (modalClosed)="modalClosed($event)"
      >
        <cds-ng-modal-header>
          <cds-ng-modal-close-button [closeButtonLabel]="closeButtonLabel"></cds-ng-modal-close-button>
          <cds-ng-ai-label alignment="bottom-end">
            ${aiLabelContent}${aiLabelActions}
          </cds-ng-ai-label>
          <cds-ng-modal-label *ngIf="modalLabel">{{modalLabel}}</cds-ng-modal-label>
          <cds-ng-modal-heading>{{modalHeading}}</cds-ng-modal-heading>
        </cds-ng-modal-header>
        <cds-ng-modal-body>
          <cds-ng-modal-body-content description style="margin-bottom: 2rem;">
            Custom domains direct requests for your apps in this Cloud Foundry
            organization to a URL that you own. A custom domain can be a shared
            domain, a shared subdomain, or a shared domain and host.
          </cds-ng-modal-body-content>
        </cds-ng-modal-body>
        <cds-ng-modal-footer *ngIf="!passiveModal">
          <cds-ng-modal-footer-button *ngIf="numberOfButtons > 2" kind="secondary">Keep both</cds-ng-modal-footer-button>
          <cds-ng-modal-footer-button *ngIf="numberOfButtons >= 2" kind="secondary">
            {{ numberOfButtons === 2 ? 'Cancel' : 'Rename' }}
          </cds-ng-modal-footer-button>
          <cds-ng-modal-footer-button [disabled]="primaryButtonDisabled" [kind]="danger ? 'danger' : 'primary'">Add</cds-ng-modal-footer-button>
        </cds-ng-modal-footer>
      </cds-ng-modal>
    `,
  }),
};

// WC: WithInlineLoading — simulates async delete with loading feedback
export const WithInlineLoading: Story = {
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
  render: (args) => ({
    props: {
      ...args,
      onDelete: () => {
        const modal = document.querySelector('cds-ng-modal') as HTMLElement;
        if (!modal) return;
        modal.setAttribute('loading-status', 'active');
        setTimeout(() => {
          modal.setAttribute('loading-description', 'Deleted!');
          modal.setAttribute('loading-status', 'finished');
        }, 2000);
      },
      onSuccess: () => {
        const modal = document.querySelector('cds-ng-modal') as HTMLElement;
        if (!modal) return;
        modal.setAttribute('loading-description', 'Deleting...');
        modal.setAttribute('loading-status', 'inactive');
      },
    },
    template: `
      <cds-ng-modal
        [alert]="alert"
        [aria-label]="ariaLabel"
        [danger]="danger"
        [open]="open"
        [fullWidth]="fullWidth"
        [hasScrollingContent]="hasScrollingContent"
        [preventCloseOnClickOutside]="preventCloseOnClickOutside"
        [size]="size"
        loading-status="inactive"
        loading-description="Deleting..."
        (modalClosed)="modalClosed($event)"
      >
        <cds-ng-modal-header>
          <cds-ng-modal-close-button [closeButtonLabel]="closeButtonLabel"></cds-ng-modal-close-button>
          <cds-ng-modal-label *ngIf="modalLabel">{{modalLabel}}</cds-ng-modal-label>
          <cds-ng-modal-heading>{{modalHeading}}</cds-ng-modal-heading>
        </cds-ng-modal-header>
        <cds-ng-modal-body></cds-ng-modal-body>
        <cds-ng-modal-footer *ngIf="!passiveModal">
          <cds-ng-modal-footer-button kind="secondary" data-modal-close>Cancel</cds-ng-modal-footer-button>
          <cds-ng-modal-footer-button
            [disabled]="primaryButtonDisabled"
            [kind]="danger ? 'danger' : 'primary'"
            (click)="onDelete()"
          >Delete</cds-ng-modal-footer-button>
        </cds-ng-modal-footer>
      </cds-ng-modal>
    `,
  }),
};

// WC: WithScrollingContent
export const WithScrollingContent: Story = {
  args: {
    ...defaultArgs,
    modalLabel: 'Account Resources',
    hasScrollingContent: true,
  },
  argTypes: controls,
  render: (args) => ({
    props: args,
    template: `
      <cds-ng-modal
        [alert]="alert"
        [aria-label]="ariaLabel"
        [danger]="danger"
        [open]="open"
        [fullWidth]="fullWidth"
        [hasScrollingContent]="hasScrollingContent"
        [preventCloseOnClickOutside]="preventCloseOnClickOutside"
        [size]="size"
        [loadingDescription]="loadingDescription"
        [loadingStatus]="loadingStatus"
        [loadingIconDescription]="loadingIconDescription"
        [shouldSubmitOnEnter]="shouldSubmitOnEnter"
        (modalClosed)="modalClosed($event)"
      >
        <cds-ng-modal-header>
          <cds-ng-modal-close-button [closeButtonLabel]="closeButtonLabel"></cds-ng-modal-close-button>
          <cds-ng-modal-label *ngIf="modalLabel">{{modalLabel}}</cds-ng-modal-label>
          <cds-ng-modal-heading>{{modalHeading}}</cds-ng-modal-heading>
        </cds-ng-modal-header>
        <cds-ng-modal-body>
          <cds-ng-modal-body-content description>
            Custom domains direct requests for your apps in this Cloud Foundry
            organization to a URL that you own. A custom domain can be a shared
            domain, a shared subdomain, or a shared domain and host.
          </cds-ng-modal-body-content>
          <cds-ng-modal-body-content description style="margin-bottom: 2rem;">
            Domain mappings provide the URL route to your Code Engine
            application or function within a project. With Code Engine, these
            mappings are automatically created, by default, whenever you deploy
            an application or create a function. However, you can map your own
            custom domain to a Code Engine application or function. This option
            routes requests from your custom URL to your application or
            function. You can use the Code Engine CLI.
          </cds-ng-modal-body-content>
        </cds-ng-modal-body>
        <cds-ng-modal-footer *ngIf="!passiveModal">
          <cds-ng-modal-footer-button *ngIf="numberOfButtons > 2" kind="secondary">Keep both</cds-ng-modal-footer-button>
          <cds-ng-modal-footer-button *ngIf="numberOfButtons >= 2" kind="secondary">
            {{ numberOfButtons === 2 ? 'Cancel' : 'Rename' }}
          </cds-ng-modal-footer-button>
          <cds-ng-modal-footer-button [disabled]="primaryButtonDisabled" [kind]="danger ? 'danger' : 'primary'">Add</cds-ng-modal-footer-button>
        </cds-ng-modal-footer>
      </cds-ng-modal>
    `,
  }),
};

// WC: WithStateManager — modal starts closed; a launch button opens it
export const WithStateManager: Story = {
  args: {
    ...defaultArgs,
    modalLabel: 'Account Resources',
    open: false,
  },
  argTypes: controls,
  render: (args) => ({
    props: {
      ...args,
      launchModal: () => {
        const modal = document.querySelector('cds-ng-modal') as HTMLElement;
        if (modal) modal.setAttribute('open', '');
      },
    },
    template: `
      <cds-ng-modal
        [alert]="alert"
        [aria-label]="ariaLabel"
        [danger]="danger"
        [open]="open"
        [fullWidth]="fullWidth"
        [hasScrollingContent]="hasScrollingContent"
        [preventCloseOnClickOutside]="preventCloseOnClickOutside"
        [size]="size"
        [loadingDescription]="loadingDescription"
        [loadingStatus]="loadingStatus"
        [loadingIconDescription]="loadingIconDescription"
        [shouldSubmitOnEnter]="shouldSubmitOnEnter"
        (modalClosed)="modalClosed($event)"
      >
        <cds-ng-modal-header>
          <cds-ng-modal-close-button [closeButtonLabel]="closeButtonLabel"></cds-ng-modal-close-button>
          <cds-ng-modal-label *ngIf="modalLabel">{{modalLabel}}</cds-ng-modal-label>
          <cds-ng-modal-heading>{{modalHeading}}</cds-ng-modal-heading>
        </cds-ng-modal-header>
        <cds-ng-modal-body>
          <cds-ng-modal-body-content description>
            Custom domains direct requests for your apps in this Cloud Foundry
            organization to a URL that you own. A custom domain can be a shared
            domain, a shared subdomain, or a shared domain and host.
          </cds-ng-modal-body-content>
        </cds-ng-modal-body>
        <cds-ng-modal-footer *ngIf="!passiveModal">
          <cds-ng-modal-footer-button *ngIf="numberOfButtons > 2" kind="secondary">Keep both</cds-ng-modal-footer-button>
          <cds-ng-modal-footer-button *ngIf="numberOfButtons >= 2" kind="secondary">
            {{ numberOfButtons === 2 ? 'Cancel' : 'Rename' }}
          </cds-ng-modal-footer-button>
          <cds-ng-modal-footer-button [disabled]="primaryButtonDisabled" [kind]="danger ? 'danger' : 'primary'">Add</cds-ng-modal-footer-button>
        </cds-ng-modal-footer>
      </cds-ng-modal>
      <button type="button" (click)="launchModal()" style="margin-top: 1rem;">Launch modal</button>
    `,
  }),
};

// TODO(parity): EnableDialogElement — lives in modal.feature-flag.stories.ts in
// @carbon/web-components. On hold until the dialog version of Modal is stable.
