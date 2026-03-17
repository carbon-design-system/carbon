/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import '../button';
import '../text-input';
import '../select';
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
import { iconLoader } from '../../globals/internal/icon-loader';
import { ifDefined } from 'lit/directives/if-defined.js';

const toggleButton = () => {
  document.querySelector('cds-dialog')?.toggleAttribute('open');
};

const defaultArgs = {
  ariaLabel: '',
  ariaLabelledBy: 'title',
  ariaDescribedBy: '',
  preventCloseOnClickOutside: false,
  role: 'dialog',
};

const controls = {
  ariaLabel: {
    control: 'text',
    description: 'Specify text for the accessibility label of the dialog',
  },
  ariaLabelledBy: {
    control: 'text',
    description: 'Specify the ID of an element that labels this dialog',
  },
  ariaDescribedBy: {
    control: 'text',
    description: 'Specify the ID of an element that describes this dialog',
  },
  preventCloseOnClickOutside: {
    control: 'boolean',
    description: 'Prevent closing on click outside of dialog',
  },
  role: {
    control: 'select',
    options: ['dialog', 'alertdialog'],
    description: 'Specify the role of the dialog for accessibility',
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

export const DangerDialog = {
  args: defaultArgs,
  argTypes: controls,
  render: ({
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    preventCloseOnClickOutside,
    role,
  }) => html`
    <cds-dialog
      aria-label=${ifDefined(ariaLabel || undefined)}
      aria-labelledby=${ifDefined(ariaLabelledBy || undefined)}
      aria-describedby=${ifDefined(ariaDescribedBy || undefined)}
      .modal=${true}
      ?prevent-close-on-click-outside=${preventCloseOnClickOutside}
      role=${role}>
      <cds-dialog-header>
        <cds-dialog-subtitle>Account resources</cds-dialog-subtitle>
        <cds-dialog-title id="title">
          Are you sure you want to delete this custom domain?
        </cds-dialog-title>
        <cds-dialog-controls>
          <cds-dialog-close-button></cds-dialog-close-button>
        </cds-dialog-controls>
      </cds-dialog-header>
      <cds-dialog-body></cds-dialog-body>
      <cds-dialog-footer danger>
        <cds-dialog-footer-button kind="secondary" data-dialog-close
          >Cancel</cds-dialog-footer-button
        >
        <cds-dialog-footer-button kind="danger" data-dialog-close
          >Delete</cds-dialog-footer-button
        >
      </cds-dialog-footer>
    </cds-dialog>
    <cds-button @click="${toggleButton}">Toggle open</cds-button>
  `,
};

export const Modal = {
  args: defaultArgs,
  argTypes: controls,
  render: ({
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    preventCloseOnClickOutside,
    role,
  }) => html`
    <cds-dialog
      aria-label=${ifDefined(ariaLabel || undefined)}
      aria-labelledby=${ifDefined(ariaLabelledBy || undefined)}
      aria-describedby=${ifDefined(ariaDescribedBy || undefined)}
      .modal=${true}
      .open=${true}
      ?prevent-close-on-click-outside=${preventCloseOnClickOutside}
      role=${role}>
      <cds-dialog-header>
        <cds-dialog-subtitle>Configure dialog settings</cds-dialog-subtitle>
        <cds-dialog-title id="title">Modal Dialog Example</cds-dialog-title>
        <cds-dialog-controls>
          <cds-dialog-close-button></cds-dialog-close-button>
          <cds-ai-label alignment="bottom-end">
            ${content}${actions}</cds-ai-label
          >
        </cds-dialog-controls>
      </cds-dialog-header>
      <cds-dialog-body>
        <p>
          Elit hic at labore culpa itaque fugiat. Consequuntur iure autem autem
          officiis dolores facilis nulla earum! Neque quia nemo sequi assumenda
          ratione officia Voluptate beatae eligendi placeat nemo laborum,
          ratione.
        </p>
        <p>
          Elit hic at labore culpa itaque fugiat. Consequuntur iure autem autem
          officiis dolores facilis nulla earum! Neque quia nemo sequi assumenda
          ratione officia Voluptate beatae eligendi placeat nemo laborum,
          ratione.
        </p>
        <cds-text-input label="Name" placeholder="Enter your name">
        </cds-text-input>
        <cds-select label-text="Region" placeholder="US South">
          <cds-select-item value="us-south">US South</cds-select-item>
          <cds-select-item value="us-east">US East</cds-select-item>
        </cds-select>
        <p>
          Elit hic at labore culpa itaque fugiat. Consequuntur iure autem autem
          officiis dolores facilis nulla earum! Neque quia nemo sequi assumenda
          ratione officia Voluptate beatae eligendi placeat nemo laborum,
          ratione.
        </p>
        <p>
          Elit hic at labore culpa itaque fugiat. Consequuntur iure autem autem
          officiis dolores facilis nulla earum! Neque quia nemo sequi assumenda
          ratione officia Voluptate beatae eligendi placeat nemo laborum,
          ratione.
        </p>
        <p>
          Elit hic at labore culpa itaque fugiat. Consequuntur iure autem autem
          officiis dolores facilis nulla earum! Neque quia nemo sequi assumenda
          ratione officia Voluptate beatae eligendi placeat nemo laborum,
          ratione.
        </p>
        <p>
          Elit hic at labore culpa itaque fugiat. Consequuntur iure autem autem
          officiis dolores facilis nulla earum! Neque quia nemo sequi assumenda
          ratione officia Voluptate beatae eligendi placeat nemo laborum,
          ratione.
        </p>
        <p>
          Elit hic at labore culpa itaque fugiat. Consequuntur iure autem autem
          officiis dolores facilis nulla earum! Neque quia nemo sequi assumenda
          ratione officia Voluptate beatae eligendi placeat nemo laborum,
          ratione.
        </p>
        <p>
          Elit hic at labore culpa itaque fugiat. Consequuntur iure autem autem
          officiis dolores facilis nulla earum! Neque quia nemo sequi assumenda
          ratione officia Voluptate beatae eligendi placeat nemo laborum,
          ratione.
        </p>
      </cds-dialog-body>
      <cds-dialog-footer>
        <cds-dialog-footer-button kind="secondary" data-dialog-close
          >Cancel</cds-dialog-footer-button
        >
        <cds-dialog-footer-button kind="primary" data-dialog-close
          >Save</cds-dialog-footer-button
        >
      </cds-dialog-footer>
    </cds-dialog>
    <cds-button @click="${toggleButton}">Toggle open</cds-button>
  `,
};

export const NonModal = {
  args: defaultArgs,
  argTypes: controls,
  parameters: {
    controls: {
      exclude: ['preventCloseOnClickOutside'],
    },
  },
  render: ({ ariaLabel, ariaLabelledBy, ariaDescribedBy, role }) => html`
    <cds-button @click="${toggleButton}">Toggle open</cds-button>
    <cds-dialog
      aria-label=${ifDefined(ariaLabel || undefined)}
      aria-labelledby=${ifDefined(ariaLabelledBy || undefined)}
      aria-describedby=${ifDefined(ariaDescribedBy || undefined)}
      .modal=${false}
      .open=${true}
      role=${role}>
      <cds-dialog-header>
        <cds-dialog-subtitle
          >Non-modal dialog example Subtitle
        </cds-dialog-subtitle>
        <cds-dialog-title id="title">Non-Modal Dialog</cds-dialog-title>
        <cds-dialog-controls>
          <cds-dialog-close-button></cds-dialog-close-button>
        </cds-dialog-controls>
      </cds-dialog-header>
      <cds-dialog-body>
        <p>
          Elit hic at labore culpa itaque fugiat. Consequuntur iure autem autem
          officiis dolores facilis nulla earum! Neque quia nemo sequi assumenda
          ratione officia Voluptate beatae eligendi placeat nemo laborum,
          ratione.
        </p>
        <cds-text-input label="Name" placeholder="Enter your name">
        </cds-text-input>
        <cds-select label-text="Region" placeholder="US South">
          <cds-select-item value="us-south">US South</cds-select-item>
          <cds-select-item value="us-east">US East</cds-select-item>
        </cds-select>
        <p>
          Elit hic at labore culpa itaque fugiat. Consequuntur iure autem autem
          officiis dolores facilis nulla earum! Neque quia nemo sequi assumenda
          ratione officia Voluptate beatae eligendi placeat nemo laborum,
          ratione.
        </p>
      </cds-dialog-body>
      <cds-dialog-footer>
        <cds-dialog-footer-button kind="secondary" data-dialog-close
          >Cancel</cds-dialog-footer-button
        >
        <cds-dialog-footer-button kind="primary" data-dialog-close
          >Submit</cds-dialog-footer-button
        >
      </cds-dialog-footer>
    </cds-dialog>
  `,
};

export const PassiveDialog = {
  args: defaultArgs,
  argTypes: controls,
  render: ({
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    preventCloseOnClickOutside,
    role,
  }) => html`
    <cds-dialog
      aria-label=${ifDefined(ariaLabel || undefined)}
      aria-labelledby=${ifDefined(ariaLabelledBy || undefined)}
      aria-describedby=${ifDefined(ariaDescribedBy || undefined)}
      .modal=${true}
      ?prevent-close-on-click-outside=${preventCloseOnClickOutside}
      role=${role}>
      <cds-dialog-header>
        <cds-dialog-title id="title">Information Message</cds-dialog-title>
        <cds-dialog-controls>
          <cds-dialog-close-button></cds-dialog-close-button>
        </cds-dialog-controls>
      </cds-dialog-header>
      <cds-dialog-body>
        <p>You have been successfully signed out</p>
      </cds-dialog-body>
    </cds-dialog>
    <cds-button @click="${toggleButton}">Toggle open</cds-button>
  `,
};

export const WithScrollingContent = {
  args: defaultArgs,
  argTypes: controls,
  render: ({
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    preventCloseOnClickOutside,
    role,
  }) => html`
    <cds-dialog
      aria-label=${ifDefined(ariaLabel || undefined)}
      aria-labelledby=${ifDefined(ariaLabelledBy || undefined)}
      aria-describedby=${ifDefined(ariaDescribedBy || undefined)}
      .modal=${true}
      .open=${true}
      ?prevent-close-on-click-outside=${preventCloseOnClickOutside}
      role=${role}>
      <cds-dialog-header>
        <cds-dialog-subtitle>Configure dialog settings</cds-dialog-subtitle>
        <cds-dialog-title id="title">Modal Dialog Example</cds-dialog-title>
        <cds-dialog-controls>
          <cds-dialog-close-button></cds-dialog-close-button>
        </cds-dialog-controls>
      </cds-dialog-header>
      <cds-dialog-body has-scrolling-content>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eu
          nibh odio. Nunc a consequat est, id porttitor sapien. Proin vitae leo
          vitae orci tincidunt auctor eget eget libero. Ut tincidunt ultricies
          fringilla. Aliquam erat volutpat. Aenean arcu odio, elementum vel
          vehicula vitae, porttitor ac lorem. Sed viverra elit ac risus
          tincidunt fermentum. Ut sollicitudin nibh id risus ornare ornare.
          Etiam gravida orci ut lectus dictum, quis ultricies felis mollis.
          Mauris nec commodo est, nec faucibus nibh. Nunc commodo ante quis
          pretium consectetur. Ut ac nisl vitae mi mattis vulputate a at elit.
          Nullam porttitor ex eget mi feugiat mattis. Nunc non sodales magna.
          Proin ornare tellus quis hendrerit egestas. Donec pharetra leo nec
          molestie sollicitudin.
        </p>
        <cds-text-input label="Name" placeholder="Enter your name">
        </cds-text-input>
        <cds-select label-text="Region" placeholder="US South">
          <cds-select-item value="us-south">US South</cds-select-item>
          <cds-select-item value="us-east">US East</cds-select-item>
        </cds-select>
        <p>
          Elit hic at labore culpa itaque fugiat. Consequuntur iure autem autem
          officiis dolores facilis nulla earum! Neque quia nemo sequi assumenda
          ratione officia Voluptate beatae eligendi placeat nemo laborum,
          ratione.
        </p>
        <p>
          Elit hic at labore culpa itaque fugiat. Consequuntur iure autem autem
          officiis dolores facilis nulla earum! Neque quia nemo sequi assumenda
          ratione officia Voluptate beatae eligendi placeat nemo laborum,
          ratione.
        </p>
        <cds-text-input label="Name" placeholder="Enter your name">
        </cds-text-input>

        <cds-select label-text="Region" placeholder="US South">
          <cds-select-item value="us-south">US South</cds-select-item>
          <cds-select-item value="us-east">US East</cds-select-item>
        </cds-select>
        <p>
          Elit hic at labore culpa itaque fugiat. Consequuntur iure autem autem
          officiis dolores facilis nulla earum! Neque quia nemo sequi assumenda
          ratione officia Voluptate beatae eligendi placeat nemo laborum,
          ratione.
        </p>
      </cds-dialog-body>
      <cds-dialog-footer>
        <cds-dialog-footer-button kind="secondary" data-dialog-close
          >Cancel</cds-dialog-footer-button
        >
        <cds-dialog-footer-button kind="primary" data-dialog-close
          >Save</cds-dialog-footer-button
        >
      </cds-dialog-footer>
    </cds-dialog>
    <cds-button @click="${toggleButton}">Toggle open</cds-button>
  `,
};

const meta = {
  title: 'Preview/Dialog',
};

export default meta;
