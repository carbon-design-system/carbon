/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { settings } from 'carbon-components';
import { iconAddSolid, iconSearch } from 'carbon-icons';
import { Add16, Search16 } from '@carbon/icons-react';
import Button from '../Button';
import ButtonSkeleton from '../Button/Button.Skeleton';

const { prefix } = settings;

const icons = {
  None: 'None',
  'Add with filled circle (Add16 from `@carbon/icons-react`)': 'Add16',
  'Search (Search16 from `@carbon/icons-react`)': 'Search16',
};

const iconMap = {
  iconAddSolid,
  iconSearch,
  Add16,
  Search16,
};

const kinds = {
  'Primary button (primary)': 'primary',
  'Secondary button (secondary)': 'secondary',
  'Danger button (danger)': 'danger',
  'Ghost button (ghost)': 'ghost',
};

const sizes = {
  Default: 'default',
  Field: 'field',
  Small: 'small',
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
    const iconToUse = iconMap[select('Icon (icon)', icons, 'Add16')];
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
      onClick: action('onClick'),
      onFocus: action('onFocus'),
    };
  },
};

Button.displayName = 'Button';

const CustomLink = ({ children, href, ...other }) => (
  <a href={href} {...other}>
    {children}
  </a>
);

storiesOf('Buttons', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => {
      const regularProps = props.regular();
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}>
          <Button {...regularProps} className="some-class">
            Button
          </Button>
          &nbsp;
          <Button {...regularProps} href="#" className="some-class">
            Link
          </Button>
          &nbsp;
          <Button {...regularProps} as="p" href="#" className="some-class">
            Element
          </Button>
          &nbsp;
          <Button
            {...regularProps}
            as={CustomLink}
            href="#"
            className="some-class">
            Custom component
          </Button>
        </div>
      );
    },
    {
      info: {
        text: `
          Buttons are used to initialize an action, either in the background or
          foreground of an experience.

          There are several kinds of buttons.

          Primary buttons should be used for the principle call to action
          on the page.

          Secondary buttons should be used for secondary actions on each page.

          Danger buttons should be used for a negative action (such as Delete) on the page.

          Modify the behavior of the button by changing its event properties.

          Field buttons may be use directly next to an input element, to visually align their heights.

          Small buttons may be used when there is not enough space for a
          regular sized button. This issue is most found in tables. Small button should have three words
          or less.

          When words are not enough, icons can be used in buttons to better communicate what the button does. Icons are
          always paired with text.
        `,
      },
    }
  )
  .add('Icon-only buttons', () => <Button {...props.iconOnly()} hasIconOnly />)
  .add(
    'Sets of Buttons',
    () => {
      const setProps = props.set();
      return (
        <div className={`${prefix}--btn-set`}>
          <Button kind="secondary" {...setProps}>
            Secondary button
          </Button>
          <Button kind="primary" {...setProps}>
            Primary button
          </Button>
        </div>
      );
    },
    {
      info: {
        text: `
          When an action required by the user has more than one option, always use a a negative action button (secondary) paired with a positive action button (primary) in that order. Negative action buttons will be on the left. Positive action buttons should be on the right. When these two types buttons are paired in the correct order, they will automatically space themselves apart.
        `,
      },
    }
  )
  .add(
    'skeleton',
    () => (
      <div>
        <ButtonSkeleton />
        &nbsp;
        <ButtonSkeleton href="#" />
        &nbsp;
        <ButtonSkeleton size="small" />
      </div>
    ),
    {
      info: {
        text: `
          Placeholder skeleton state to use when content is loading.
        `,
      },
    }
  );
