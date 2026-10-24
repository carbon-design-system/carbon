/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { expect, userEvent } from 'storybook/test';
import { ButtonComponent } from '../Button.component';

const meta: Meta<ButtonComponent> = {
  title: 'Legacy carbon-components-angular/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
> ⚠️ **Legacy adapter** — part of \`@carbon/angular/legacy\`.

This component matches the \`carbon-components-angular\` API exactly so you can
drop in \`@carbon/angular/legacy\` without changing templates or \`@Input()\`
bindings. Migrate individual components to \`@carbon/angular\` when you're ready.

\`\`\`ts
import { ButtonComponent } from '@carbon/angular/legacy';

@Component({
  standalone: true,
  imports: [ButtonComponent],
  template: \`
    <cds-button kind="primary" size="lg" (buttonClick)="onClick($event)">
      Save
    </cds-button>
  \`,
})
export class MyComponent {
  onClick(event: MouseEvent) { /* ... */ }
}
\`\`\`
        `.trim(),
      },
    },
  },
  argTypes: {
    kind: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'ghost',
        'danger',
        'danger-primary',
        'danger-tertiary',
        'danger-ghost',
      ],
      description: 'Visual variant of the button.',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Size variant.',
    },
    buttonClick: { action: 'buttonClick' },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// ─── Default render shared across variant stories ─────────────────────────────

const defaultRender: Story['render'] = (args) => ({
  props: args,
  template: `<cds-button
    [kind]="kind"
    [size]="size"
    [disabled]="disabled"
    [isExpressive]="isExpressive"
    (buttonClick)="buttonClick($event)"
  >Button</cds-button>`,
});

// ─── WC-parity stories ────────────────────────────────────────────────────────

export const Default: Story = {
  args: {
    kind: 'primary',
    size: 'lg',
    disabled: false,
    isExpressive: false,
  },
  render: defaultRender,
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector('cds-ng-button') as HTMLElement;
    const button = host?.shadowRoot?.querySelector(
      'button'
    ) as HTMLButtonElement;
    await expect(button).toBeVisible();
    await expect(button).not.toBeDisabled();
    await userEvent.click(host);
  },
};

export const Secondary: Story = {
  args: { ...Default.args, kind: 'secondary' },
  render: defaultRender,
  play: Default.play,
};

export const Tertiary: Story = {
  args: { ...Default.args, kind: 'tertiary' },
  render: defaultRender,
  play: Default.play,
};

export const Ghost: Story = {
  args: { ...Default.args, kind: 'ghost' },
  render: defaultRender,
  play: Default.play,
};

export const Danger: Story = {
  args: {
    ...Default.args,
    kind: 'danger',
    dangerDescription: 'Dangerous action',
  },
  render: (args) => ({
    props: args,
    template: `<cds-button
      [kind]="kind"
      [dangerDescription]="dangerDescription"
      (buttonClick)="buttonClick($event)"
    >Delete</cds-button>`,
  }),
  play: Default.play,
};

export const DangerTertiary: Story = {
  args: {
    ...Default.args,
    kind: 'danger-tertiary',
    dangerDescription: 'Dangerous action',
  },
  render: Danger.render,
  play: Default.play,
};

export const DangerGhost: Story = {
  args: {
    ...Default.args,
    kind: 'danger-ghost',
    dangerDescription: 'Dangerous action',
  },
  render: Danger.render,
  play: Default.play,
};

export const IconButton: Story = {
  args: {
    ...Default.args,
    tooltipText: 'Add item',
    tooltipPosition: 'bottom',
  },
  render: (args) => ({
    props: args,
    template: `<cds-button
      [kind]="kind"
      [tooltipText]="tooltipText"
      [tooltipPosition]="tooltipPosition"
      (buttonClick)="buttonClick($event)"
    ><svg slot="icon" focusable="false" preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg" fill="currentColor"
        aria-hidden="true" width="16" height="16" viewBox="0 0 32 32">
        <path d="M17 15V8h-2v7H8v2h7v7h2v-7h7v-2z"/>
      </svg></cds-button>`,
  }),
  play: async ({ canvasElement }) => {
    const wc = canvasElement.querySelector('cds-ng-button');
    await expect(wc?.getAttribute('tooltip-text')).toBe('Add item');
    await expect(wc?.getAttribute('tooltip-position')).toBe('bottom');
  },
};

export const SetOfButtons: StoryObj<Record<string, unknown>> = {
  argTypes: {
    stacked: {
      control: 'boolean',
      description:
        'Specify the button arrangement of the set (vertically stacked or horizontal)',
    },
  },
  render: (args) => ({
    props: args,
    template: `<cds-ng-button-set [attr.stacked]="stacked || null">
      <cds-button kind="secondary">Secondary</cds-button>
      <cds-button kind="primary">Primary</cds-button>
    </cds-ng-button-set>`,
  }),
  play: async ({ canvasElement }) => {
    const buttons = canvasElement.querySelectorAll('cds-ng-button');
    await expect(buttons.length).toBe(2);
  },
};

export const Skeleton: StoryObj<Record<string, unknown>> = {
  render: () => ({
    template: `<cds-ng-button-skeleton size="md"></cds-ng-button-skeleton>`,
  }),
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('cds-ng-button-skeleton');
    await expect(skeleton).not.toBeNull();
  },
};

// ─── Angular-specific stories ─────────────────────────────────────────────────

export const Disabled: Story = {
  args: { ...Default.args, disabled: true },
  render: defaultRender,
  play: async ({ canvasElement }) => {
    const wc = canvasElement.querySelector('cds-ng-button');
    await expect(wc?.getAttribute('disabled')).not.toBeNull();
  },
};

export const Expressive: Story = {
  args: { ...Default.args, isExpressive: true },
  render: defaultRender,
  play: async ({ canvasElement }) => {
    const host = canvasElement.querySelector('cds-ng-button') as HTMLElement;
    await expect(host).not.toBeNull();
    await (host as unknown as { updateComplete: Promise<boolean> })
      .updateComplete;
    const button = host.shadowRoot?.querySelector('button');
    await expect(button?.classList.contains('cds--btn--expressive')).toBe(true);
  },
};

export const AsLink: Story = {
  args: {
    ...Default.args,
    href: 'https://carbondesignsystem.com',
    target: '_blank',
  },
  render: (args) => ({
    props: args,
    template: `<cds-button
      [kind]="kind"
      [href]="href"
      [target]="target"
    >Carbon Design System</cds-button>`,
  }),
  play: async ({ canvasElement }) => {
    const wc = canvasElement.querySelector('cds-ng-button');
    await expect(wc?.getAttribute('href')).toBe(
      'https://carbondesignsystem.com'
    );
  },
};

// TODO(parity): Radius — cds-button-radius CSS custom property showcase (utilities not yet ported)
// TODO(parity): IconButtonWithBadge — requires cds-badge-indicator slot support
