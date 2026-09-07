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

const radiusTokenScale = [
  ['00', '0'],
  ['02', '0.125rem'],
  ['04', '0.25rem'],
  ['08', '0.5rem'],
  ['16', '1rem'],
  ['24', '1.5rem'],
  ['max', '999999px'],
];

const radiusTokenOptions = ['unset', ...radiusTokenScale.map(([name]) => name)];

const radiusTokenMapping = {
  unset: undefined,
  ...Object.fromEntries(radiusTokenScale),
};

function toRadiusStyle({ radius, radiusSs, radiusSe, radiusEs, radiusEe }) {
  const style = {};
  if (radius != null) {
    style['--cds-button-radius'] = radius;
  }
  if (radiusSs != null) {
    style['--cds-button-radius-ss'] = radiusSs;
  }
  if (radiusSe != null) {
    style['--cds-button-radius-se'] = radiusSe;
  }
  if (radiusEs != null) {
    style['--cds-button-radius-es'] = radiusEs;
  }
  if (radiusEe != null) {
    style['--cds-button-radius-ee'] = radiusEe;
  }
  return style;
}

const radiusStack = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
};

const radiusGroup = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
};

const radiusRow = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1rem',
  alignItems: 'center',
};

const radiusLabel = {
  color: 'var(--cds-text-secondary)',
  fontSize: '0.875rem',
};

function ButtonRadiusExamples({
  radius,
  radiusSs,
  radiusSe,
  radiusEs,
  radiusEe,
  renderIcon,
  iconDescription,
  hasIconOnly: _hasIconOnly,
  ...buttonProps
}) {
  const playgroundStyle = toRadiusStyle({
    radius,
    radiusSs,
    radiusSe,
    radiusEs,
    radiusEe,
  });
  const icon = renderIcon ?? Add;
  const iconLabel = iconDescription || 'Add';

  return (
    <div style={radiusStack}>
      <div style={radiusGroup}>
        <span style={radiusLabel}>Custom</span>
        <div style={{ ...radiusRow, ...playgroundStyle }}>
          <Button {...buttonProps} renderIcon={renderIcon}>
            Button
          </Button>
          <Button
            {...buttonProps}
            hasIconOnly
            renderIcon={icon}
            iconDescription={iconLabel}
          />
        </div>
      </div>
      <div style={radiusGroup}>
        <span style={radiusLabel}>All corners · text</span>
        <div style={radiusRow}>
          {radiusTokenScale.map(([name, value]) => (
            <div key={`text-${name}`} style={toRadiusStyle({ radius: value })}>
              <Button {...buttonProps} renderIcon={renderIcon}>
                {name}
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div style={radiusGroup}>
        <span style={radiusLabel}>All corners · icon-only</span>
        <div style={radiusRow}>
          {radiusTokenScale.map(([name, value]) => (
            <div key={`icon-${name}`} style={toRadiusStyle({ radius: value })}>
              <Button
                {...buttonProps}
                hasIconOnly
                renderIcon={icon}
                iconDescription={name}
              />
            </div>
          ))}
        </div>
      </div>
      <div style={radiusGroup}>
        <span style={radiusLabel}>Joined split (Combo Button)</span>
        <div style={{ display: 'inline-flex', columnGap: 1 }}>
          <div
            style={toRadiusStyle({
              radius: '999999px',
              radiusSe: '0',
              radiusEe: '0',
            })}>
            <Button {...buttonProps}>Primary action</Button>
          </div>
          <div
            style={toRadiusStyle({
              radius: '999999px',
              radiusSs: '0',
              radiusEs: '0',
            })}>
            <Button
              {...buttonProps}
              hasIconOnly
              renderIcon={icon}
              iconDescription="More"
            />
          </div>
        </div>
      </div>
      <div style={radiusGroup}>
        <span style={radiusLabel}>Last action end-end (AI Label footer)</span>
        <div
          style={{
            ...toRadiusStyle({ radius: '0' }),
            display: 'inline-flex',
          }}>
          <Button {...buttonProps} kind="ghost">
            Cancel
          </Button>
          <div style={toRadiusStyle({ radiusEe: 'calc(0.5rem - 1px)' })}>
            <Button {...buttonProps}>Confirm</Button>
          </div>
        </div>
      </div>
      <div style={radiusGroup}>
        <span style={radiusLabel}>Nested override</span>
        <div style={{ ...toRadiusStyle({ radius: '0' }), ...radiusRow }}>
          <Button {...buttonProps}>Page</Button>
          <div style={toRadiusStyle({ radius: '999999px' })}>
            <Button {...buttonProps}>Hero</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

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
];

const skeletonControls = ['href', 'size'];

export default {
  title: 'Components/Button',
  component: Button,
  subcomponents: { ButtonSkeleton },
  argTypes: sharedArgTypes,
  parameters: {
    docs: {
      page: mdx,
    },
  },
};

export const Default = (args) => {
  const { renderIcon, ...rest } = args;
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

const radiusArgType = (name, description) => ({
  name,
  description,
  options: radiusTokenOptions,
  mapping: radiusTokenMapping,
  control: { type: 'select' },
  table: { category: 'Radius' },
});

export const Radius = (args) => {
  const { renderIcon, ...rest } = args;
  return (
    <ButtonRadiusExamples
      {...rest}
      renderIcon={
        renderIcon && renderIcon !== 'None'
          ? getIconFromString(renderIcon)
          : undefined
      }
      onClick={action('onClick')}
    />
  );
};

Radius.argTypes = {
  ...sharedArgTypes,
  radius: radiusArgType(
    '--cds-button-radius',
    'Sets every corner. Per-corner properties win when set.'
  ),
  radiusSs: radiusArgType('--cds-button-radius-ss', 'Start-start corner'),
  radiusSe: radiusArgType('--cds-button-radius-se', 'Start-end corner'),
  radiusEs: radiusArgType('--cds-button-radius-es', 'End-start corner'),
  radiusEe: radiusArgType('--cds-button-radius-ee', 'End-end corner'),
};

Radius.args = {
  radius: 'max',
  radiusSs: 'unset',
  radiusSe: 'unset',
  radiusEs: 'unset',
  radiusEe: 'unset',
};

Radius.parameters = {
  controls: {
    include: [
      ...textButtonControls,
      'radius',
      'radiusSs',
      'radiusSe',
      'radiusEs',
      'radiusEe',
    ],
  },
};

export const Secondary = (args) => {
  const { renderIcon, ...rest } = args;
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
  const { renderIcon, ...rest } = args;
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
  const { renderIcon, ...rest } = args;
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
  const { renderIcon, ...rest } = args;
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
  const { renderIcon, ...rest } = args;
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
  const { renderIcon, ...rest } = args;
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
  const { renderIcon, ...rest } = args;
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
  const { renderIcon, ...rest } = args;
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

export const Skeleton = (args) => <ButtonSkeleton {...args} />;

Skeleton.parameters = {
  controls: {
    include: skeletonControls,
  },
};
