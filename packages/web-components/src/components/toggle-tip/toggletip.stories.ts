/**
 * Copyright IBM Corp. 2019, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { keyed } from 'lit/directives/keyed.js';
import './toggletip';
import '../button';
import '../link';
import { POPOVER_ALIGNMENT } from '../popover/defs';

const toggletipAlignments = {
  [`top`]: POPOVER_ALIGNMENT.TOP,
  [`top-left`]: POPOVER_ALIGNMENT.TOP_LEFT,
  [`top-right`]: POPOVER_ALIGNMENT.TOP_RIGHT,
  [`top-start`]: POPOVER_ALIGNMENT.TOP_START,
  [`top-end`]: POPOVER_ALIGNMENT.TOP_END,
  [`bottom`]: POPOVER_ALIGNMENT.BOTTOM,
  [`bottom-left`]: POPOVER_ALIGNMENT.BOTTOM_LEFT,
  [`bottom-right`]: POPOVER_ALIGNMENT.BOTTOM_RIGHT,
  [`bottom-start`]: POPOVER_ALIGNMENT.BOTTOM_START,
  [`bottom-end`]: POPOVER_ALIGNMENT.BOTTOM_END,
  [`left`]: POPOVER_ALIGNMENT.LEFT,
  [`left-bottom`]: POPOVER_ALIGNMENT.LEFT_BOTTOM,
  [`left-top`]: POPOVER_ALIGNMENT.LEFT_TOP,
  [`left-start`]: POPOVER_ALIGNMENT.LEFT_START,
  [`left-end`]: POPOVER_ALIGNMENT.LEFT_END,
  [`right`]: POPOVER_ALIGNMENT.RIGHT,
  [`right-bottom`]: POPOVER_ALIGNMENT.RIGHT_BOTTOM,
  [`right-top`]: POPOVER_ALIGNMENT.RIGHT_TOP,
  [`right-start`]: POPOVER_ALIGNMENT.RIGHT_START,
  [`right-end`]: POPOVER_ALIGNMENT.RIGHT_END,
};

const args = {
  alignment: 'bottom',
  alignmentAxisOffset: 0,
  autoalign: false,
  bodyText:
    'Your available balance reflects completed transactions and may not include pending activity.',
  buttonLabel: 'Show account balance details',
  buttonText: 'View balance',
  defaultOpen: false,
  labelText: 'Account balance',
  linkText: 'Learn more',
};

const argTypes = {
  alignment: {
    control: 'select',
    description: 'Specify how the toggletip should align with the button',
    options: Object.keys(toggletipAlignments),
  },
  alignmentAxisOffset: {
    control: 'number',
    description:
      'Provide an offset value for alignment axis. Only takes effect when `autoalign` is enabled.',
    if: { arg: 'autoalign', eq: true },
  },
  autoalign: {
    control: 'boolean',
    description:
      'Will auto-align the popover. This attribute is currently experimental and is subject to future changes.',
  },
  defaultOpen: {
    control: 'boolean',
    description: 'Specify if the toggletip should be open by default',
  },
  bodyText: {
    control: 'text',
    description: 'Provide the content displayed inside the toggletip.',
    table: { category: 'Slot' },
  },
  buttonLabel: {
    control: 'text',
    description: 'Provide an accessible label for the toggletip button.',
  },
  buttonText: {
    control: 'text',
    description: 'Provide the button text displayed in the actions slot.',
    table: { category: 'Slot' },
  },
  labelText: {
    control: 'text',
    description: 'Provide the visible label for the toggletip.',
    table: { category: 'Slot' },
  },
  linkText: {
    control: 'text',
    description: 'Provide the link text displayed in the actions slot.',
    table: { category: 'Slot' },
  },
};

const experimentalArgTypes = {
  ...argTypes,
  autoalign: {
    ...argTypes.autoalign,
    table: { readonly: true },
  },
  defaultOpen: {
    ...argTypes.defaultOpen,
    table: { readonly: true },
  },
};

export const Default = {
  argTypes,
  args,
  render: ({
    alignment,
    alignmentAxisOffset,
    autoalign,
    bodyText,
    buttonLabel,
    buttonText,
    defaultOpen,
    labelText,
    linkText,
  }) => html`
    <div style="display: flex; align-items: center">
      ${keyed(
        defaultOpen,
        html`
          <cds-toggletip
            alignment=${alignment}
            .alignmentAxisOffset=${alignmentAxisOffset}
            ?autoalign=${autoalign}
            button-label=${buttonLabel}
            ?default-open=${defaultOpen}>
            ${labelText}

            <p slot="body-text">${bodyText}</p>
            <cds-link href="#" slot="actions">${linkText}</cds-link>
            <cds-button size="sm" slot="actions">${buttonText}</cds-button>
          </cds-toggletip>
        `
      )}
    </div>
  `,
};

export const ExperimentalAutoAlign = {
  argTypes: experimentalArgTypes,
  args: {
    ...args,
    autoalign: true,
    bodyText:
      'Scroll the container to observe how the toggletip automatically changes position to stay within the viewport.',
    buttonLabel: 'Show auto-alignment details',
    buttonText: 'View details',
    defaultOpen: true,
    labelText: 'Automatic alignment',
  },
  render: ({
    alignment,
    alignmentAxisOffset,
    autoalign,
    bodyText,
    buttonLabel,
    buttonText,
    defaultOpen,
    labelText,
    linkText,
  }) => html`
    <div style="width: 5000px; height: 5000px;">
      <div
        style="
          display: flex;
          align-items: center;
          inline-size: max-content;
          position: absolute;
          top: 2500px;
          left: 2500px;
        ">
        ${keyed(
          defaultOpen,
          html`
            <cds-toggletip
              alignment=${alignment}
              .alignmentAxisOffset=${alignmentAxisOffset}
              ?autoalign=${autoalign}
              button-label=${buttonLabel}
              ?default-open=${defaultOpen}>
              ${labelText}
              <p slot="body-text">${bodyText}</p>

              <cds-link href="#" slot="actions">${linkText}</cds-link>
              <cds-button size="sm" slot="actions">${buttonText}</cds-button>
            </cds-toggletip>
          `
        )}
      </div>
    </div>
  `,
};

const meta = {
  title: 'Components/Toggletip',
};

export default meta;
