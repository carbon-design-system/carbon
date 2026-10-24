/**
 * Copyright IBM Corp. 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import type { Meta, StoryObj } from '@storybook/angular';
import { expect, userEvent } from 'storybook/test';
import { ButtonComponent } from '../../../generated/Button';

const meta: Meta<ButtonComponent> = {
  title: 'Components/Button',
  component: ButtonComponent,
  parameters: {
    docs: {
      description: {
        component: `
Buttons are clickable elements that trigger actions. Import from \`@carbon/angular\`
for all new development.

\`\`\`ts
import { ButtonComponent } from '@carbon/angular';

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
    type: {
      control: 'select',
      options: ['button', 'reset', 'submit'],
    },
    tooltipPosition: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
    },
    tooltipAlignment: {
      control: 'select',
      // WC enum values: BUTTON_TOOLTIP_ALIGNMENT.START='left', .CENTER='', .END='right'
      options: ['left', '', 'right'],
      labels: { left: 'Start', '': 'Center', right: 'End' },
    },
  },
};

export default meta;
type Story = StoryObj<ButtonComponent>;

// ─── WC-parity stories (one-for-one with @carbon/web-components Button) ──────

// WC: Default
export const Default: Story = {
  args: {
    kind: 'primary',
    size: 'lg',
    type: 'button',
    disabled: false,
    isExpressive: false,
  },
  render: (args) => ({
    props: args,
    template: `<cds-button
      [kind]="kind"
      [size]="size"
      [type]="type"
      [disabled]="disabled"
      [isExpressive]="isExpressive"
      (buttonClick)="buttonClick($event)"
    >Button</cds-button>`,
  }),
  play: async ({ canvasElement }) => {
    // In the host-is-WC design (ADR 0015) the host element IS cds-button.
    // The shadow root is on the host element itself.
    const host = canvasElement.querySelector('cds-button') as HTMLElement;
    const button = host?.shadowRoot?.querySelector(
      'button'
    ) as HTMLButtonElement;

    await expect(button).toBeVisible();
    await expect(button).not.toBeDisabled();

    await userEvent.click(host);
  },
};

// WC: Secondary
export const Secondary: Story = {
  args: { ...Default.args, kind: 'secondary' },
  render: Default.render,
  play: Default.play,
};

// WC: Tertiary
export const Tertiary: Story = {
  args: { ...Default.args, kind: 'tertiary' },
  render: Default.render,
  play: Default.play,
};

// WC: Ghost
export const Ghost: Story = {
  args: { ...Default.args, kind: 'ghost' },
  render: Default.render,
  play: Default.play,
};

// WC: Danger
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

// WC: DangerTertiary
export const DangerTertiary: Story = {
  args: {
    ...Default.args,
    kind: 'danger-tertiary',
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

// WC: DangerGhost
export const DangerGhost: Story = {
  args: {
    ...Default.args,
    kind: 'danger-ghost',
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

// WC: IconButton
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
    // Host IS the cds-button WC.
    const wc = canvasElement.querySelector('cds-button');
    await expect(wc?.getAttribute('tooltip-text')).toBe('Add item');
    await expect(wc?.getAttribute('tooltip-position')).toBe('bottom');
  },
};

// WC: SetOfButtons
// Uses StoryObj<Record<string, unknown>> — renders cds-ng-button-set which has
// its own `stacked` arg, not a property of ButtonComponent.
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
    // cds-button-set is the WC tag registered by the ButtonSetComponent wrapper.
    // Both the set and the child buttons are Angular-managed host elements.
    template: `<cds-button-set [attr.stacked]="stacked || null">
      <cds-button kind="secondary">Secondary</cds-button>
      <cds-button kind="primary">Primary</cds-button>
    </cds-button-set>`,
  }),
  play: async ({ canvasElement }) => {
    const buttons = canvasElement.querySelectorAll('cds-button');
    await expect(buttons.length).toBe(2);
  },
};

// WC: Skeleton
// Uses StoryObj<Record<string, unknown>> — renders cds-button-skeleton, not ButtonComponent.
export const Skeleton: StoryObj<Record<string, unknown>> = {
  render: () => ({
    // cds-button-skeleton is the WC tag registered by the ButtonSkeletonComponent wrapper.
    template: `<cds-button-skeleton size="md"></cds-button-skeleton>`,
  }),
  play: async ({ canvasElement }) => {
    const skeleton = canvasElement.querySelector('cds-button-skeleton');
    await expect(skeleton).not.toBeNull();
  },
};

// ─── Angular-only stories (CVA / forms / Angular-specific behaviour) ──────────

// Demonstrates disabled attribute reflection on the underlying WC element
export const Disabled: Story = {
  args: { ...Default.args, disabled: true },
  render: Default.render,
  play: async ({ canvasElement }) => {
    // Host IS the cds-button WC; disabled is set directly on it.
    const wc = canvasElement.querySelector('cds-button');
    await expect(wc?.getAttribute('disabled')).not.toBeNull();
  },
};

// Demonstrates expressive flag
export const Expressive: Story = {
  args: { ...Default.args, isExpressive: true },
  render: Default.render,
  play: async ({ canvasElement }) => {
    // `isExpressive` must reach the WC as a property (the WC does not observe
    // an `is-expressive` attribute), so assert on the rendered shadow DOM.
    // Host IS cds-button — shadow root is directly on it.
    const host = canvasElement.querySelector('cds-button') as HTMLElement;
    await expect(host).not.toBeNull();
    await (host as unknown as { updateComplete: Promise<boolean> })
      .updateComplete;
    const button = host.shadowRoot?.querySelector('button');
    await expect(button?.classList.contains('cds--btn--expressive')).toBe(true);
  },
};

// Demonstrates rendering as an anchor element via [href]
export const AsLink: Story = {
  args: {
    ...Default.args,
    kind: 'primary',
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
    // Host IS the cds-button WC.
    const wc = canvasElement.querySelector('cds-button');
    await expect(wc?.getAttribute('href')).toBe(
      'https://carbondesignsystem.com'
    );
  },
};

// TODO(parity): Radius — demonstrates --cds-button-radius CSS custom property controls.
// The CSS tokens apply identically to the Angular wrapper (they target the WC's shadow styles),
// but the radiusArgType / radiusTokenScale helpers live in the WC story utilities and have
// not yet been ported to the Angular Storybook.
export const Radius: StoryObj<Record<string, unknown>> = {
  tags: ['!dev', '!autodocs'],
  render: () => ({
    // TODO(parity): implement radius token showcase matching WC story.
    template: `<cds-button kind="primary" style="--cds-button-radius: max">Button</cds-button>`,
  }),
};

// TODO(parity): IconButtonWithBadge — requires cds-badge-indicator slot support in ButtonComponent.
