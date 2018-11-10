import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { withKnobs, select, text } from '@storybook/addon-knobs';
import { iconAddSolid, iconSearch } from 'carbon-icons';
import Icon from '../Icon';
import ContentSwitcher from '../ContentSwitcher';
import Switch from '../Switch';

const icons = {
  None: 'None',
  'Add with filled circle (iconAddSolid from `carbon-icons`)': 'iconAddSolid',
  'Search (iconSearch from `carbon-icons`)': 'iconSearch',
};

const iconMap = {
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
    kind: select('Button kind (kind in <Switch>)', kinds, 'anchor'),
    href: text('The link href (href in <Switch>)', ''),
    icon: iconMap[select('Icon (icon in <Switch>)', icons, 'none')],
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
