/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import {
  DropdownComponent,
  DropdownItemComponent,
} from '@carbon/angular/dropdown';

/**
 * Verification story for a `ControlValueAccessor` driven by the
 * `cds-ng-dropdown-selected` custom event, with slotted child items. Asserted
 * by `Dropdown.e2e.ts`.
 */
const meta: Meta<DropdownComponent> = {
  title: 'Components/Dropdown',
  component: DropdownComponent,
  decorators: [
    moduleMetadata({
      imports: [ReactiveFormsModule, DropdownItemComponent],
    }),
  ],
};

export default meta;
type Story = StoryObj<DropdownComponent>;

export const ReactiveForm: Story = {
  render: () => ({
    props: { control: new FormControl('1.1') },
    template: `
      <cds-ng-dropdown label="Select" title-text="TLS" [formControl]="control">
        <cds-ng-dropdown-item value="1.0">1.0</cds-ng-dropdown-item>
        <cds-ng-dropdown-item value="1.1">1.1</cds-ng-dropdown-item>
        <cds-ng-dropdown-item value="1.2">1.2</cds-ng-dropdown-item>
      </cds-ng-dropdown>
      <p data-testid="value">{{ control.value }}</p>
      <button type="button" data-testid="set" (click)="control.setValue('1.2')">set 1.2</button>
    `,
  }),
};
