/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { moduleMetadata, type Meta, type StoryObj } from '@storybook/angular';
import { TextInputComponent } from '@carbon/angular/text-input';

/**
 * Verification stories for the generated `ControlValueAccessor` (input/change
 * events, `value` property) and for named-slot projection. They are asserted
 * by `TextInput.e2e.ts`.
 */
const meta: Meta<TextInputComponent> = {
  title: 'Components/TextInput',
  component: TextInputComponent,
  decorators: [moduleMetadata({ imports: [FormsModule, ReactiveFormsModule] })],
};

export default meta;
type Story = StoryObj<TextInputComponent>;

// Template-driven forms: `[(ngModel)]`.
export const NgModel: Story = {
  render: () => ({
    props: { name: 'initial' },
    template: `
      <cds-ng-text-input label="Name" [(ngModel)]="name"></cds-ng-text-input>
      <p data-testid="model">{{ name }}</p>
    `,
  }),
};

// Reactive forms: `[formControl]`, programmatic set, disable and touched.
export const ReactiveForm: Story = {
  render: () => ({
    props: { control: new FormControl('initial') },
    template: `
      <cds-ng-text-input label="Name" [formControl]="control"></cds-ng-text-input>
      <p data-testid="value">{{ control.value }}</p>
      <p data-testid="touched">{{ control.touched }}</p>
      <button type="button" data-testid="set" (click)="control.setValue('programmatic')">set</button>
      <button type="button" data-testid="disable" (click)="control.disable()">disable</button>
      <button type="button" data-testid="enable" (click)="control.enable()">enable</button>
    `,
  }),
};

// Named slots: Angular projects the light-DOM children and keeps `slot`.
export const Slots: Story = {
  render: () => ({
    template: `
      <cds-ng-text-input>
        <span slot="label-text" data-testid="label-slot">Projected label</span>
        <span slot="helper-text" data-testid="helper-slot">Projected helper</span>
      </cds-ng-text-input>
    `,
  }),
};
