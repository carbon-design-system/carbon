/**
 * @license
 *
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import './index';
import '@carbon/web-components/es/components/button/index.js';
import type { ActionButton, ButtonKind } from './action-set';

const sizes = {
  'Small (sm)': 'sm',
  'Medium (md)': 'md',
  'Large (lg)': 'lg',
  'Extra Large (xl)': 'xl',
  '2XL (2xl)': '2xl',
};

const buttonSizes = {
  'Default (use size)': '',
  'Small (sm)': 'sm',
  'Medium (md)': 'md',
  'Large (lg)': 'lg',
  'Extra Large (xl)': 'xl',
  '2XL (2xl)': '2xl',
};

const numberOfButtons = {
  'Two buttons': 2,
  'Three buttons': 3,
  'Four buttons': 4,
};

const includeGhost = {
  'No ghost button': false,
  'Include ghost button': true,
};

export default {
  title: 'Utilities/ActionSet',
  argTypes: {
    size: {
      control: 'select',
      options: sizes,
      description: 'The size of the action set',
    },
    buttonSize: {
      control: 'select',
      options: buttonSizes,
      description: 'Override button size (optional)',
    },
    disableStacking: {
      control: 'boolean',
      description: 'Prevent automatic stacking of buttons',
    },
    numberOfButtons: {
      control: 'select',
      options: numberOfButtons,
      description: 'Number of buttons to display',
    },
    includeGhost: {
      control: 'select',
      options: includeGhost,
      description: 'Include a ghost button',
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
Action Set is a utility component that manages a set of action buttons with validation,
ordering, and responsive layout capabilities. It can be used with slotted buttons or
by passing an actions array prop.

## Features
- Automatic button ordering based on kind (ghost first, primary last)
- Validation of button combinations
- Responsive stacking behavior
- Focus management with button separator hiding
- Support for multiple sizes (sm, md, lg, xl, 2xl)
        `,
      },
    },
  },
};

const getActions = (
  numberOfButtons: number,
  includeGhost: boolean
): ActionButton[] => {
  const baseActions: ActionButton[] = [
    {
      kind: 'secondary' as ButtonKind,
      label: 'Cancel',
      onClick: () => console.log('Cancel clicked'),
    },
    {
      kind: 'primary' as ButtonKind,
      label: 'Submit',
      onClick: () => console.log('Submit clicked'),
    },
  ];

  const ghostAction: ActionButton = {
    kind: 'ghost' as ButtonKind,
    label: 'Ghost',
    onClick: () => console.log('Ghost clicked'),
  };

  const tertiaryAction: ActionButton = {
    kind: 'tertiary' as ButtonKind,
    label: 'Tertiary',
    onClick: () => console.log('Tertiary clicked'),
  };

  const dangerAction: ActionButton = {
    kind: 'danger' as ButtonKind,
    label: 'Danger',
    onClick: () => console.log('Danger clicked'),
  };

  let actions = [...baseActions];

  if (includeGhost) {
    actions = [ghostAction, ...actions];
  }

  if (numberOfButtons === 3 && !includeGhost) {
    actions = [tertiaryAction, ...actions];
  }

  if (numberOfButtons === 4) {
    if (includeGhost) {
      actions = [ghostAction, tertiaryAction, ...baseActions];
    } else {
      actions = [tertiaryAction, ...baseActions, dangerAction];
    }
  }

  return actions;
};

export const Default = {
  args: {
    size: 'lg',
    buttonSize: '',
    disableStacking: false,
    numberOfButtons: 2,
    includeGhost: false,
  },
  render: (args: any) => {
    const actions = getActions(args.numberOfButtons, args.includeGhost);
    return html`
      <div style="padding: 2rem; background: var(--cds-layer-01);">
        <h3 style="margin-bottom: 1rem;">Action Set with Actions Prop</h3>
        <c4p-action-set
          size="${args.size}"
          button-size="${args.buttonSize || args.size}"
          ?disable-stacking="${args.disableStacking}"
          .actions="${actions}"
        ></c4p-action-set>
      </div>
    `;
  },
};

export const WithSlottedButtons = {
  render: () => html`
    <div style="padding: 2rem; background: var(--cds-layer-01);">
      <h3 style="margin-bottom: 1rem;">Action Set with Slotted Buttons</h3>
      <c4p-action-set size="lg">
        <cds-button kind="secondary">Cancel</cds-button>
        <cds-button kind="primary">Submit</cds-button>
      </c4p-action-set>
    </div>
  `,
};

export const DifferentSizes = {
  render: () => {
    const actions: ActionButton[] = [
      {
        kind: 'secondary' as ButtonKind,
        label: 'Cancel',
        onClick: () => console.log('Cancel clicked'),
      },
      {
        kind: 'primary' as ButtonKind,
        label: 'Submit',
        onClick: () => console.log('Submit clicked'),
      },
    ];

    return html`
      <div style="padding: 2rem; background: var(--cds-layer-01);">
        <h3 style="margin-bottom: 1rem;">Small (sm) - Stacks automatically</h3>
        <c4p-action-set size="sm" .actions="${actions}"></c4p-action-set>

        <h3 style="margin: 2rem 0 1rem;">Medium (md)</h3>
        <c4p-action-set size="md" .actions="${actions}"></c4p-action-set>

        <h3 style="margin: 2rem 0 1rem;">Large (lg)</h3>
        <c4p-action-set size="lg" .actions="${actions}"></c4p-action-set>

        <h3 style="margin: 2rem 0 1rem;">Extra Large (xl)</h3>
        <c4p-action-set size="xl" .actions="${actions}"></c4p-action-set>

        <h3 style="margin: 2rem 0 1rem;">2XL (2xl)</h3>
        <c4p-action-set size="2xl" .actions="${actions}"></c4p-action-set>
      </div>
    `;
  },
};

export const FourActions = {
  render: () => html`
    <div style="padding: 2rem; background: var(--cds-layer-01);">
      <h3 style="margin-bottom: 1rem;">Action Set with Four Buttons</h3>
      <c4p-action-set
        size="xl"
        .actions="${[
          {
            kind: 'tertiary',
            label: 'Tertiary',
            onClick: () => console.log('Tertiary clicked'),
          },
          {
            kind: 'secondary',
            label: 'Secondary',
            onClick: () => console.log('Secondary clicked'),
          },
          {
            kind: 'danger',
            label: 'Danger',
            onClick: () => console.log('Danger clicked'),
          },
          {
            kind: 'primary',
            label: 'Primary',
            onClick: () => console.log('Primary clicked'),
          },
        ]}"
      ></c4p-action-set>
    </div>
  `,
};
