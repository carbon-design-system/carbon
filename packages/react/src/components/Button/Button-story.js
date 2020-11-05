/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { iconAddSolid, iconSearch } from 'carbon-icons';
import { Add16, AddFilled16, Search16 } from '@carbon/icons-react';
import Button from '../Button';
import ButtonSkeleton from '../Button/Button.Skeleton';
import ButtonSet from '../ButtonSet';
import mdx from './Button.mdx';

const icons = {
  None: 'None',
  'Add (Add16 from `@carbon/icons-react`)': 'Add16',
  'Add (Filled) (AddFilled16 from `@carbon/icons-react`)': 'AddFilled16',
  'Search (Search16 from `@carbon/icons-react`)': 'Search16',
};

const iconMap = {
  iconAddSolid,
  iconSearch,
  Add16,
  AddFilled16,
  Search16,
};

const kinds = {
  'Primary button (primary)': 'primary',
  'Secondary button (secondary)': 'secondary',
  'Tertiary button (tertiary)': 'tertiary',
  'Danger button (danger)': 'danger',
  'Ghost button (ghost)': 'ghost',
};

const sizes = {
  Default: 'default',
  Field: 'field',
  'Small (sm)': 'small',
  'Large (lg)': 'lg',
  'Extra large size (xl)': 'xl',
};

const props = {
  regular: () => {
    const iconToUse = iconMap[select('Icon (icon)', icons, 'none')];
    return {
      className: 'some-class',
      kind: select('Button kind (kind)', kinds, 'primary'),
      disabled: boolean('Disabled (disabled)', false),
      size: select('Button size (size)', sizes, 'default'),
      renderIcon: !iconToUse || iconToUse.svgData ? undefined : iconToUse,
      iconDescription: text(
        'Icon description (iconDescription)',
        'Button icon'
      ),
      onClick: action('onClick'),
      onFocus: action('onFocus'),
    };
  },
  iconOnly: () => {
    let iconToUse;

    if (iconMap[select('Icon (icon)', icons, 'Add16')] == undefined) {
      iconToUse = Add16;
    } else {
      iconToUse = iconMap[select('Icon (icon)', icons, 'Add16')];
    }
    return {
      className: 'some-class',
      kind: select(
        'Button kind (kind)',
        {
          'Primary button (primary)': 'primary',
          'Secondary button (secondary)': 'secondary',
          'Tertiary button (tertiary)': 'tertiary',
          'Ghost button (ghost)': 'ghost',
          'Danger button (danger)': 'danger',
        },
        'primary'
      ),
      disabled: boolean('Disabled (disabled)', false),
      size: select('Button size (size)', sizes, 'default'),
      renderIcon: !iconToUse || iconToUse.svgData ? undefined : iconToUse,
      iconDescription: text(
        'Icon description (iconDescription)',
        'Button icon'
      ),
      tooltipPosition: select(
        'Tooltip position (tooltipPosition)',
        ['top', 'right', 'bottom', 'left'],
        'bottom'
      ),
      tooltipAlignment: select(
        'Tooltip alignment (tooltipAlignment)',
        ['start', 'center', 'end'],
        'center'
      ),
      onClick: action('onClick'),
      onFocus: action('onFocus'),
    };
  },
  set: () => {
    const iconToUse = iconMap[select('Icon (icon)', icons, 'none')];
    return {
      className: 'some-class',
      disabled: boolean('Disabled (disabled)', false),
      size: select('Button size (size)', sizes, 'default'),
      renderIcon: !iconToUse || iconToUse.svgData ? undefined : iconToUse,
      iconDescription: text(
        'Icon description (iconDescription)',
        'Button icon'
      ),
      stacked: boolean('Stack buttons vertically (stacked)', false),
      onClick: action('onClick'),
      onFocus: action('onFocus'),
    };
  },
};

export default {
  title: 'Button',
  decorators: [withKnobs],
  parameters: {
    component: Button,
    subcomponents: {
      ButtonSet,
      ButtonSkeleton,
    },
    docs: {
      page: mdx,
    },
  },
};

export const _Default = () => {
  return <Button>Button</Button>;
};

_Default.story = {
  name: 'Button',
};

export const Secondary = () => {
  return <Button kind="secondary">Button</Button>;
};

export const Tertiary = () => {
  return <Button kind="tertiary">Button</Button>;
};

export const Danger = () => {
  return (
    <>
      <Button kind="danger">Button</Button>
      &nbsp;
      <Button kind="danger--tertiary">Tertiary Danger Button</Button>
      &nbsp;
      <Button kind="danger--ghost">Ghost Danger Button</Button>
    </>
  );
};

export const Ghost = () => {
  return <Button kind="ghost">Button</Button>;
};

export const Playground = () => {
  const regularProps = props.regular();
  const iconOnly = props.iconOnly();
  const { stacked, ...buttonProps } = props.set();
  return (
    <>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}>
        <Button {...regularProps}>Button</Button>
        &nbsp;
        <Button hasIconOnly {...iconOnly}></Button>
      </div>
      <div
        style={{
          marginTop: '1rem',
        }}>
        <ButtonSet stacked={stacked}>
          <Button kind="secondary" {...buttonProps}>
            Secondary button
          </Button>
          <Button kind="primary" {...buttonProps}>
            Primary button
          </Button>
        </ButtonSet>
      </div>
    </>
  );
};

export const IconButton = () => (
  <Button renderIcon={Add16} iconDescription="Icon Description" hasIconOnly />
);

IconButton.story = {
  name: 'Icon Button',
};

export const SetOfButtons = () => {
  return (
    <ButtonSet>
      <Button kind="secondary">Secondary button</Button>
      <Button kind="primary">Primary button</Button>
    </ButtonSet>
  );
};

export const Skeleton = () => (
  <div>
    <ButtonSkeleton />
    &nbsp;
    <ButtonSkeleton small />
  </div>
);
