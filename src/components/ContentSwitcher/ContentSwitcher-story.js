/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, select, text, boolean } from '@storybook/addon-knobs';
import { iconAddSolid, iconSearch } from 'carbon-icons';
import Icon from '../Icon';
import ContentSwitcher from '../ContentSwitcher';
import Switch from '../Switch';
import { componentsX } from '../../internal/FeatureFlags';

const icons = {
  None: 'None',
  ...(!componentsX && {
    'Add with filled circle (iconAddSolid from `carbon-icons`)': 'iconAddSolid',
    'Search (iconSearch from `carbon-icons`)': 'iconSearch',
  }),
  ...(componentsX && {
    'Add with filled circle (AddFilled16 from `@carbon/icons-react`)':
      'AddFilled16',
    'Search (Search16 from `@carbon/icons-react`)': 'Search16',
  }),
};

const iconMap = componentsX
  ? undefined
  : {
      iconAddSolid: <Icon icon={iconAddSolid} />,
      iconSearch: <Icon icon={iconSearch} />,
    };

const kinds = {
  'Anchor (anchor)': 'anchor',
  'Button (button)': 'button',
};

const props = {
  contentSwitcher: () => ({
    onChange: action('onChange'),
  }),
  switch: () => ({
    onClick: action('onClick - Switch'),
    kind: componentsX
      ? undefined
      : select('Button kind (kind in <Switch>)', kinds, 'anchor'),
    href: componentsX
      ? undefined
      : text('The link href (href in <Switch>)', ''),
    icon: componentsX
      ? undefined
      : iconMap[select('Icon (icon in <Switch>)', icons, 'none')],
    disabled: boolean('Disabled (disabled)', false),
  }),
};

storiesOf('ContentSwitcher', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => {
      const switchProps = props.switch();
      return (
        <ContentSwitcher {...props.contentSwitcher()}>
          <Switch name="one" text="First section" {...switchProps} />
          <Switch name="two" text="Second section" {...switchProps} />
          <Switch name="three" text="Third section" {...switchProps} />
        </ContentSwitcher>
      );
    },
    {
      info: {
        text: `
            The Content Switcher component manipulates the content shown following an exclusive or “either/or” pattern.
            Create Switch components for each section in the content switcher.
          `,
      },
    }
  )
  .add(
    'Selected',
    () => {
      const switchProps = props.switch();
      return (
        <ContentSwitcher {...props.contentSwitcher()} selectedIndex={1}>
          <Switch name="one" text="First section" {...switchProps} />
          <Switch name="two" text="Second section" {...switchProps} />
          <Switch name="three" text="Third section" {...switchProps} />
        </ContentSwitcher>
      );
    },
    {
      info: {
        text: `
             Render the Content Switcher with a different section automatically selected
           `,
      },
    }
  );
