/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { iconAddSolid, iconSearch } from 'carbon-icons';
import {
  Add16,
  AddFilled16,
  Search16,
  PlayOutlineFilled32,
  PlayOutlineFilled16,
} from '@carbon/icons-react';
import Button from '../Button';
import ButtonSkeleton from '../Button/Button.Skeleton';
import ButtonSet from '../ButtonSet';
import mdx from './Button.mdx';

const icons = {
  None: 'None',
  'Add (Add16 from `@carbon/icons-react`)': 'Add16',
  'Add (Filled) (AddFilled16 from `@carbon/icons-react`)': 'AddFilled16',
  'Search (Search16 from `@carbon/icons-react`)': 'Search16',
  'PlayOutlineFilled16 (PlayOutlineFilled16 from `@carbon/icons-react`)':
    'PlayOutlineFilled16',
  'PlayOutlineFilled32 (PlayOutlineFilled32 from `@carbon/icons-react`)':
    'PlayOutlineFilled32',
};

const iconMap = {
  iconAddSolid,
  iconSearch,
  Add16,
  AddFilled16,
  Search16,
  PlayOutlineFilled16,
  PlayOutlineFilled32,
};

const kinds = {
  'Primary button (primary)': 'primary',
  'Secondary button (secondary)': 'secondary',
  'Tertiary button (tertiary)': 'tertiary',
  'Danger button (danger)': 'danger',
  'Danger tertiary button (danger--tertiary)': 'danger--tertiary',
  'Danger ghost button (danger--ghost)': 'danger--ghost',
  'Ghost button (ghost)': 'ghost',
};

// V11: New size table
// const sizes = {
//   'Small  (sm)': 'sm',
//   'Medium (md)': 'md',
//   'Large  (lg)  - default': null,
//   'Extra Large (xl)': 'xl',
//   'Extra Extra Large (2xl)': '2xl',
// };

const sizes = {
  'Small  (sm)': 'sm',
  'Medium (md)': 'md',
  Default: null,
  'Large (lg)': 'lg',
  'Extra Large (xl)': 'xl',
};

const props = {
  regular: () => {
    const iconToUse = iconMap[select('Icon (icon)', icons, 'none')];
    return {
      className: 'some-class',
      isExpressive: boolean('Expressive', false),
      kind: select('Button kind (kind)', kinds, 'primary'),
      disabled: boolean('Disabled (disabled)', false),
      size: select('Button size (size)', sizes, 'default'),
      renderIcon: !iconToUse || iconToUse.svgData ? undefined : iconToUse,
      iconDescription: text(
        'Icon description (iconDescription)',
        'Button icon'
      ),
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
      isExpressive: boolean('Expressive', false),
      kind: select('Button kind (kind)', kinds, 'primary'),
      disabled: boolean('Disabled (disabled)', false),
      isSelected: boolean('Selected (isSelected)', false),
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
    };
  },
  set: () => {
    const iconToUse = iconMap[select('Icon (icon)', icons, 'none')];
    return {
      className: 'some-class',
      isExpressive: boolean('Expressive', false),
      disabled: boolean('Disabled (disabled)', false),
      size: select('Button size (size)', sizes, 'default'),
      renderIcon: !iconToUse || iconToUse.svgData ? undefined : iconToUse,
      iconDescription: text(
        'Icon description (iconDescription)',
        'Button icon'
      ),
      stacked: boolean('Stack buttons vertically (stacked)', false),
    };
  },
};

export default {
  title: 'Components/Button',
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
        <Button {...regularProps}>Buttons</Button>
        &nbsp;
        {!regularProps.kind.includes('danger') && (
          <>
            <Button hasIconOnly {...iconOnly}></Button>
            &nbsp;
            <Button hasIconOnly {...iconOnly} kind="ghost"></Button>
          </>
        )}
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

export const ExpressiveButtons = () => {
  return (
    <>
      <div
        style={{
          margin: '1rem',
        }}>
        <Button isExpressive size="default">
          Button
        </Button>
      </div>
      <div
        style={{
          margin: '1rem',
        }}>
        <Button isExpressive size="lg">
          Button
        </Button>
      </div>
      <div
        style={{
          margin: '1rem',
        }}>
        <Button isExpressive size="xl">
          Button
        </Button>
      </div>
      <div
        style={{
          margin: '1rem',
        }}>
        <Button isExpressive size="default" renderIcon={Add16}>
          Button
        </Button>
      </div>
      <div
        style={{
          margin: '1rem',
        }}>
        <Button
          isExpressive
          renderIcon={Add16}
          hasIconOnly
          iconDescription="Icon description"
        />
      </div>
      <div
        style={{
          marginTop: '1rem',
        }}>
        <ButtonSet>
          <Button kind="secondary" isExpressive>
            Secondary button
          </Button>
          <Button kind="primary" isExpressive>
            Primary button
          </Button>
        </ButtonSet>
      </div>
    </>
  );
};

export const Skeleton = () => (
  <div>
    <ButtonSkeleton size="xl" />
    &nbsp;
    <ButtonSkeleton size="lg" />
    &nbsp;
    <ButtonSkeleton />
    &nbsp;
    <ButtonSkeleton size="md" />
    &nbsp;
    <ButtonSkeleton small />
  </div>
);
