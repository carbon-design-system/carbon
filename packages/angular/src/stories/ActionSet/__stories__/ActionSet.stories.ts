/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { ActionSetComponent } from '@carbon/angular/action-set';
import { ButtonComponent } from '@carbon/angular/button';

/**
 * Verification stories for `ActionSet`: slotted buttons (the `slotchange`
 * path) and the `actions` array (the property-forwarding path). Asserted by
 * `ActionSet.e2e.ts`.
 */
const meta: Meta<ActionSetComponent> = {
  title: 'Utilities/ActionSet',
  component: ActionSetComponent,
  decorators: [moduleMetadata({ imports: [ButtonComponent] })],
};

export default meta;
type Story = StoryObj<ActionSetComponent>;

export const SlottedButtons: Story = {
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

export const ActionsProperty: Story = {
  render: () => ({
    props: {
      actions: [
        { kind: 'primary', label: 'Submit' },
        { kind: 'secondary', label: 'Cancel' },
      ],
    },
    template: `<cds-ng-action-set size="lg" [actions]="actions"></cds-ng-action-set>`,
  }),
};

// Three buttons at `md` stack; `disableStacking` keeps them in a row.
export const Stacking: Story = {
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
