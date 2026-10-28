/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { CheckboxComponent } from '@carbon/angular/checkbox';

/**
 * Verification stories for a `ControlValueAccessor` bound to `checked` and
 * driven by the `cds-ng-checkbox-changed` custom event. Asserted by
 * `Checkbox.e2e.ts`.
 */
const meta: Meta<CheckboxComponent> = {
  title: 'Components/Checkbox',
  component: CheckboxComponent,
  decorators: [moduleMetadata({ imports: [FormsModule, ReactiveFormsModule] })],
};

export default meta;
type Story = StoryObj<CheckboxComponent>;

export const NgModel: Story = {
  render: () => ({
    props: { agreed: false },
    template: `
      <cds-ng-checkbox [(ngModel)]="agreed">Accept the terms</cds-ng-checkbox>
      <p data-testid="model">{{ agreed }}</p>
    `,
  }),
};

export const ReactiveForm: Story = {
  render: () => ({
    props: { control: new FormControl(true) },
    template: `
      <cds-ng-checkbox [formControl]="control">Accept the terms</cds-ng-checkbox>
      <p data-testid="value">{{ control.value }}</p>
      <button type="button" data-testid="set" (click)="control.setValue(false)">uncheck</button>
      <button type="button" data-testid="disable" (click)="control.disable()">disable</button>
    `,
  }),
};
