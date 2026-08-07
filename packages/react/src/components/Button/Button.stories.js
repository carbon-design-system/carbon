/**
 * Copyright IBM Corp. 2016, 2026
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from 'storybook/actions';
import { Add, Notification, Filter } from '@carbon/icons-react';
import { default as Button, ButtonSkeleton } from '../Button';
import mdx from './Button.mdx';
import './button-story.scss';
import {
  radiusArgTypes,
  radiusArgs,
  radiusNames,
  withRadiusVars,
  withoutRadiusArgs,
} from './story-radius-controls';

// Note: we explicitly define the defaultValue here, as the Button component takes `props` and forwards them
// to the underlying `button` or `a` element, as a result storybook cannot infer the default values from the component.

// Helper function to get icon component based on string option
const getIconFromString = (iconName) => {
  const icons = {
    Add: (props) => <Add {...props} />,
    Notification: (props) => <Notification {...props} />,
    Filter: (props) => <Filter {...props} />,
  };
  return icons[iconName];
};

const sharedArgTypes = {
  disabled: {
    table: { defaultValue: { summary: false } },
  },
  dangerDescription: {
    table: { defaultValue: { summary: '"danger"' } },
  },
  autoAlign: {
    table: { defaultValue: { summary: false } },
  },
  hasIconOnly: {
    table: { defaultValue: { summary: false } },
  },
  kind: {
    options: [
      'primary',
      'secondary',
      'tertiary',
      'ghost',
      'danger',
      'danger--tertiary',
      'danger--ghost',
    ],
    description:
      'Specify the kind of Button you want to create. `primary`, `secondary`,`tertiary`, `ghost`, `danger`, `danger--tertiary`, `danger--ghost`',
    control: { type: 'select' },
    type: { name: 'union' },
    table: { defaultValue: { summary: '"primary"' } },
  },
  type: {
    type: { name: 'string' },
    table: { defaultValue: { summary: '"button"' } },
  },
  size: {
    options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
    type: {
      name: 'union',
    },
    description:
      'Specify the size of the button, from the following list of sizes: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`',
    control: { type: 'select' },
    table: { defaultValue: { summary: '"lg"' } },
  },
  tooltipAlignment: {
    options: ['start', 'center', 'end'],
    control: { type: 'radio' },
    type: { name: 'union' },
    table: { defaultValue: { summary: '"center"' } },
  },
  tooltipDropShadow: {
    table: { defaultValue: { summary: false } },
  },
  tooltipHighContrast: {
    table: { defaultValue: { summary: true } },
  },
  tooltipPosition: {
    type: { name: 'union' },
    control: { type: 'radio' },
    options: ['top', 'right', 'bottom', 'left'],
    table: { defaultValue: { summary: '"top"' } },
  },
  isExpressive: {
    // TODO: doesn't work on icon buttons, but works for web-components icon buttons, need to investigate
    table: { defaultValue: { summary: false } },
  },
  isSelected: {
    table: { defaultValue: { summary: false } },
  },
  iconDescription: {
    control: 'text',
    type: { name: 'string' },
  },
  badgeCount: {
    description:
      'Optional badge count shown on icon-only buttons. This prop is supported only when `hasIconOnly=true`, `kind="ghost"`, and `size="lg"`.',
    type: { name: 'number' },
    control: { type: 'number', min: 0 },
  },

  renderIcon: {
    control: { type: 'select' },
    options: ['Add', 'None'],
  },
  ...radiusArgTypes,
};

const textButtonControls = [
  'disabled',
  'href',
  'iconDescription',
  'isExpressive',
  'kind',
  'rel',
  'renderIcon',
  'role',
  'size',
  'tabIndex',
  'target',
  'type',
  ...radiusNames,
];

const skeletonControls = ['href', 'size', ...radiusNames];

export default {
  title: 'Components/Button',
  component: Button,
  subcomponents: { ButtonSkeleton },
  argTypes: sharedArgTypes,
  args: radiusArgs,
  decorators: [withRadiusVars],
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  const { renderIcon, ...rest } = withoutRadiusArgs(args);
  return (
    <Button
      {...rest}
      renderIcon={
        renderIcon !== 'None' ? getIconFromString(renderIcon) : undefined
      }
      onClick={action('onClick')}>
      Button
    </Button>
  );
};

Default.argTypes = {
  ...sharedArgTypes,
};

Default.parameters = {
  controls: { include: [...textButtonControls, 'dangerDescription'] },
};

export const Secondary = (args) => {
  const { renderIcon, ...rest } = withoutRadiusArgs(args);
  return (
    <Button
      {...rest}
      renderIcon={
        renderIcon !== 'None' ? getIconFromString(renderIcon) : undefined
      }
      onClick={action('onClick')}>
      Button
    </Button>
  );
};

Secondary.argTypes = {
  ...sharedArgTypes,
  kind: {
    table: { readonly: true },
  },
};

Secondary.args = {
  kind: 'secondary',
};

Secondary.parameters = {
  controls: {
    include: textButtonControls,
  },
};

export const Tertiary = (args) => {
  const { renderIcon, ...rest } = withoutRadiusArgs(args);
  return (
    <Button
      {...rest}
      renderIcon={
        renderIcon !== 'None' ? getIconFromString(renderIcon) : undefined
      }
      onClick={action('onClick')}>
      Button
    </Button>
  );
};

Tertiary.argTypes = {
  ...sharedArgTypes,
  kind: {
    table: { readonly: true },
  },
};

Tertiary.args = {
  kind: 'tertiary',
};

Tertiary.parameters = {
  controls: {
    include: textButtonControls,
  },
};

export const Ghost = (args) => {
  const { renderIcon, ...rest } = withoutRadiusArgs(args);
  return (
    <Button
      {...rest}
      renderIcon={
        renderIcon !== 'None' ? getIconFromString(renderIcon) : undefined
      }
      onClick={action('onClick')}>
      Button
    </Button>
  );
};

Ghost.argTypes = {
  ...sharedArgTypes,
  kind: {
    table: { readonly: true },
  },
};

Ghost.args = {
  kind: 'ghost',
};

Ghost.parameters = {
  controls: {
    include: textButtonControls,
  },
};

export const Danger = (args) => {
  const { renderIcon, ...rest } = withoutRadiusArgs(args);
  return (
    <Button
      {...rest}
      renderIcon={
        renderIcon !== 'None' ? getIconFromString(renderIcon) : undefined
      }
      onClick={action('onClick')}>
      Button
    </Button>
  );
};

Danger.argTypes = {
  ...sharedArgTypes,
  kind: {
    table: { readonly: true },
  },
};

Danger.args = {
  kind: 'danger',
};

Danger.parameters = {
  controls: {
    include: [...textButtonControls, 'dangerDescription'],
  },
};

export const DangerTertiary = (args) => {
  const { renderIcon, ...rest } = withoutRadiusArgs(args);
  return (
    <Button
      {...rest}
      renderIcon={
        renderIcon !== 'None' ? getIconFromString(renderIcon) : undefined
      }
      onClick={action('onClick')}>
      Button
    </Button>
  );
};

DangerTertiary.argTypes = {
  ...sharedArgTypes,
  kind: {
    table: { readonly: true },
  },
};

DangerTertiary.args = {
  kind: 'danger--tertiary',
};

DangerTertiary.parameters = {
  controls: {
    include: [...textButtonControls, 'dangerDescription'],
  },
};

export const DangerGhost = (args) => {
  const { renderIcon, ...rest } = withoutRadiusArgs(args);
  return (
    <Button
      {...rest}
      renderIcon={
        renderIcon !== 'None' ? getIconFromString(renderIcon) : undefined
      }
      onClick={action('onClick')}>
      Button
    </Button>
  );
};

DangerGhost.argTypes = {
  ...sharedArgTypes,
  kind: {
    table: { readonly: true },
  },
};

DangerGhost.args = {
  kind: 'danger--ghost',
};

DangerGhost.parameters = {
  controls: {
    include: [...textButtonControls, 'dangerDescription'],
  },
};

export const IconButton = (args) => {
  const { renderIcon, ...rest } = withoutRadiusArgs(args);
  return (
    <Button
      {...rest}
      renderIcon={
        renderIcon !== 'None' ? getIconFromString(renderIcon) : undefined
      }
      onClick={action('onClick')}
    />
  );
};

IconButton.argTypes = {
  ...sharedArgTypes,
  hasIconOnly: {
    table: { readonly: true },
  },
  renderIcon: {
    options: ['Add', 'Filter'],
  },
  badgeCount: {
    table: { readonly: true },
  },
};

IconButton.args = {
  hasIconOnly: true,
  renderIcon: 'Add',
  iconDescription: 'Icon Description',
};

export const IconButtonWithBadge = (args) => {
  const { renderIcon, ...rest } = withoutRadiusArgs(args);
  return (
    <Button
      {...rest}
      renderIcon={
        renderIcon !== 'None' ? getIconFromString(renderIcon) : undefined
      }
      onClick={action('onClick')}>
      Button
    </Button>
  );
};

IconButtonWithBadge.argTypes = {
  ...sharedArgTypes,
  hasIconOnly: {
    description:
      'Specify if the button is an icon-only button. this control must be set to `true` if using the `badgeCount` prop.',
    table: { readonly: true },
  },
  kind: {
    description:
      'Specify the kind of Button you want to create. this control must be set to `ghost` if using the `badgeCount` prop.',
    table: { readonly: true },
  },
  size: {
    description:
      'Specify the size of the button, from the following list of sizes: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`. this control must be set to `lg` if using the `badgeCount` prop',
    table: { readonly: true },
  },
  renderIcon: {
    options: ['Notification'],
  },
};
IconButtonWithBadge.parameters = {
  controls: {
    exclude: ['dangerDescription'],
  },
};

IconButtonWithBadge.args = {
  hasIconOnly: true,
  renderIcon: 'Notification',
  iconDescription: 'Notification',
  badgeCount: 4,
  kind: 'ghost',
  size: 'lg',
};

export const Skeleton = (args) => (
  <ButtonSkeleton {...withoutRadiusArgs(args)} />
);

Skeleton.parameters = {
  controls: {
    include: skeletonControls,
  },
};

const Example = ({ label, note, children }) => (
  <div className="button-story-example">
    <code>{label}</code>
    <span className="button-story-example__note">{note}</span>
    {/* Keeps the content in block flow, so only `fluid` stretches. */}
    <div>{children}</div>
  </div>
);

const IconButtons = (props) => (
  <>
    <Button {...props} renderIcon={Add} hasIconOnly iconDescription="Add" />
    <Button
      {...props}
      renderIcon={Filter}
      hasIconOnly
      iconDescription="Filter"
    />
    <Button
      {...props}
      renderIcon={Notification}
      hasIconOnly
      iconDescription="Notification"
    />
  </>
);

// Everything here follows the border-radius controls; each example only
// overrides the corners it needs to, so the whole grid reacts to the sliders.
export const ButtonsInContext = (args) => {
  const { renderIcon, ...rest } = withoutRadiusArgs(args);
  const icon =
    renderIcon !== 'None' ? getIconFromString(renderIcon) : undefined;

  return (
    <div className="button-story-grid">
      <Example label="single" note="follows the base property">
        <Button {...rest}>Button</Button>
      </Example>

      <Example label="form actions" note="the common pairing">
        <div className="button-story-row">
          <Button kind="secondary" {...rest}>
            Cancel
          </Button>
          <Button kind="primary" {...rest} renderIcon={icon ?? Add}>
            Create
          </Button>
        </div>
      </Example>

      <Example label="joined" note="inner corners squared">
        <div className="button-story-joined">
          <Button kind="secondary" {...rest}>
            Day
          </Button>
          <Button kind="secondary" {...rest}>
            Week
          </Button>
          <Button kind="secondary" {...rest}>
            Month
          </Button>
        </div>
      </Example>

      <Example label="joined icons" note="tooltip wrappers, same result">
        <div className="button-story-joined">
          <IconButtons kind="secondary" {...rest} />
        </div>
      </Example>

      <Example
        label="toolbar on a layer"
        note="container = buttons + padding, so the gap is even">
        <div className="button-story-toolbar">
          <IconButtons kind="secondary" {...rest} />
        </div>
      </Example>

      <Example
        label="joined icons on a layer"
        note="container follows the group's outer corners">
        <div className="button-story-toolbar">
          <div className="button-story-joined">
            <IconButtons kind="secondary" {...rest} />
          </div>
        </div>
      </Example>

      <Example label="nested radius" note="outer = inner + padding">
        <div className="button-story-nested">
          <Button kind="primary" {...rest}>
            Inset
          </Button>
        </div>
      </Example>

      <Example label="badge" note="sits where the corner pulls in">
        <Button
          {...rest}
          kind="ghost"
          size="lg"
          hasIconOnly
          renderIcon={Notification}
          iconDescription="Notifications"
          badgeCount={4}
        />
      </Example>

      <Example label="flush with a field" note="leading corners squared">
        <div className="button-story-flush">
          <span className="button-story-flush__field">Search</span>
          <Button kind="primary" {...rest}>
            Go
          </Button>
        </div>
      </Example>

      <Example label="asymmetric" note="one corner opted out">
        <div className="button-story-asymmetric">
          <Button kind="primary" {...rest}>
            Notched
          </Button>
        </div>
      </Example>

      <Example label="fluid" note="stretched, corners unchanged">
        <div className="button-story-fluid">
          <Button kind="primary" {...rest}>
            Full width
          </Button>
        </div>
      </Example>

      <Example label="skeleton" note="clipped by overflow: hidden">
        <ButtonSkeleton size={rest.size} />
      </Example>
    </div>
  );
};

ButtonsInContext.storyName = 'Buttons in Context';
