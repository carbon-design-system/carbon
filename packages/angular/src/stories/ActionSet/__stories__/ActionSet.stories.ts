/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ActionSetComponent } from '@carbon/angular/action-set';
import { ButtonComponent } from '@carbon/angular/button';

// ─── WC-parity stories (one-for-one with @carbon/web-components ActionSet) ────

const sizes = {
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

const meta: Meta<ActionSetComponent> = {
  title: 'Utilities/ActionSet',
  component: ActionSetComponent,
  decorators: [moduleMetadata({ imports: [ButtonComponent] })],
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(sizes),
      labels: Object.fromEntries(Object.entries(sizes).map(([k, v]) => [v, k])),
      description: 'The size of the action set',
    },
    disableStacking: {
      control: 'boolean',
      description: 'Prevent automatic stacking of buttons',
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
        `.trim(),
      },
    },
  },
};

export default meta;
type Story = StoryObj<ActionSetComponent>;

type ActionButton = { kind: string; label: string };

const getActions = (
  numberOfButtons: number,
  includeGhost: boolean
): ActionButton[] => {
  const baseActions: ActionButton[] = [
    { kind: 'secondary', label: 'Cancel' },
    { kind: 'primary', label: 'Submit' },
  ];

  const ghostAction: ActionButton = { kind: 'ghost', label: 'Ghost' };
  const tertiaryAction: ActionButton = { kind: 'tertiary', label: 'Tertiary' };
  const dangerAction: ActionButton = { kind: 'danger', label: 'Danger' };

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

// WC: Default (actions prop path)
// numberOfButtons and includeGhost are story-only controls, not component inputs.
export const Default: StoryObj<Record<string, unknown>> = {
  args: {
    size: 'lg',
    disableStacking: false,
    numberOfButtons: 2,
    includeGhost: false,
  },
  argTypes: {
    size: {
      control: 'select',
      options: Object.values(sizes),
      labels: Object.fromEntries(Object.entries(sizes).map(([k, v]) => [v, k])),
      description: 'The size of the action set',
    },
    disableStacking: {
      control: 'boolean',
      description: 'Prevent automatic stacking of buttons',
    },
    numberOfButtons: {
      control: 'select',
      options: Object.values(numberOfButtons),
      labels: Object.fromEntries(
        Object.entries(numberOfButtons).map(([k, v]) => [v, k])
      ),
      description: 'Number of buttons to display',
    },
    includeGhost: {
      control: 'select',
      options: Object.values(includeGhost),
      labels: Object.fromEntries(
        Object.entries(includeGhost).map(([k, v]) => [v, k])
      ),
      description: 'Include a ghost button',
    },
  },
  render: (args) => ({
    props: {
      ...args,
      actions: getActions(
        (args['numberOfButtons'] as number) ?? 2,
        (args['includeGhost'] as boolean) ?? false
      ),
    },
    template: `
      <cds-ng-action-set
        [size]="size"
        [disableStacking]="disableStacking"
        [actions]="actions"
      ></cds-ng-action-set>
    `,
  }),
};

// WC: WithSlottedButtons
export const WithSlottedButtons: Story = {
  render: () => ({
    template: `
      <cds-ng-action-set size="lg">
        <cds-ng-button kind="secondary">Cancel</cds-ng-button>
        <cds-ng-button kind="primary">Submit</cds-ng-button>
      </cds-ng-action-set>
    `,
  }),
};

// WC: DifferentSizes
export const DifferentSizes: Story = {
  render: () => ({
    props: {
      actions: [
        { kind: 'secondary', label: 'Cancel' },
        { kind: 'primary', label: 'Submit' },
      ] as ActionButton[],
    },
    template: `
      <p style="margin-bottom: 0.5rem; font-weight: 600;">Small (sm) — stacks automatically</p>
      <cds-ng-action-set size="sm" [actions]="actions"></cds-ng-action-set>

      <p style="margin: 2rem 0 0.5rem; font-weight: 600;">Medium (md)</p>
      <cds-ng-action-set size="md" [actions]="actions"></cds-ng-action-set>

      <p style="margin: 2rem 0 0.5rem; font-weight: 600;">Large (lg)</p>
      <cds-ng-action-set size="lg" [actions]="actions"></cds-ng-action-set>

      <p style="margin: 2rem 0 0.5rem; font-weight: 600;">Extra Large (xl)</p>
      <cds-ng-action-set size="xl" [actions]="actions"></cds-ng-action-set>

      <p style="margin: 2rem 0 0.5rem; font-weight: 600;">2XL (2xl)</p>
      <cds-ng-action-set size="2xl" [actions]="actions"></cds-ng-action-set>
    `,
  }),
};

// WC: FourActions
export const FourActions: Story = {
  render: () => ({
    props: {
      actions: [
        { kind: 'tertiary', label: 'Tertiary' },
        { kind: 'secondary', label: 'Secondary' },
        { kind: 'danger', label: 'Danger' },
        { kind: 'primary', label: 'Primary' },
      ] as ActionButton[],
    },
    template: `
      <cds-ng-action-set size="xl" [actions]="actions"></cds-ng-action-set>
    `,
  }),
};

// ─── Angular-only: Stacking verification story (used by ActionSet.e2e.ts) ─────
export const Stacking: Story = {
  tags: ['!dev', '!autodocs'],
  render: () => ({
    template: `
      <cds-ng-action-set size="md" data-testid="stacked">
        <cds-ng-button kind="tertiary">Tertiary</cds-ng-button>
        <cds-ng-button kind="secondary">Cancel</cds-ng-button>
        <cds-ng-button kind="primary">Submit</cds-ng-button>
      </cds-ng-action-set>
      <cds-ng-action-set size="md" [disableStacking]="true" data-testid="unstacked">
        <cds-ng-button kind="tertiary">Tertiary</cds-ng-button>
        <cds-ng-button kind="secondary">Cancel</cds-ng-button>
        <cds-ng-button kind="primary">Submit</cds-ng-button>
      </cds-ng-action-set>
    `,
  }),
};

// Angular-only: SlottedButtons (used by ActionSet.e2e.ts)
export const SlottedButtons: Story = {
  tags: ['!dev', '!autodocs'],
  render: () => ({
    template: `
      <cds-ng-action-set size="lg">
        <cds-ng-button kind="secondary">Cancel</cds-ng-button>
        <cds-ng-button kind="ghost">Ghost</cds-ng-button>
        <cds-ng-button kind="primary">Submit</cds-ng-button>
      </cds-ng-action-set>
    `,
  }),
};

// Angular-only: ActionsProperty (used by ActionSet.e2e.ts)
export const ActionsProperty: Story = {
  tags: ['!dev', '!autodocs'],
  render: () => ({
    props: {
      actions: [
        { kind: 'primary', label: 'Submit' },
        { kind: 'secondary', label: 'Cancel' },
      ] as ActionButton[],
    },
    template: `<cds-ng-action-set size="lg" [actions]="actions"></cds-ng-action-set>`,
  }),
};
