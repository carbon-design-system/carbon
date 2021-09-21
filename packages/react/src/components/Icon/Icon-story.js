/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { iconAdd, iconAddSolid, iconAddOutline } from 'carbon-icons';
import { withKnobs, select, text } from '@storybook/addon-knobs';
import Icon from '../Icon';
import IconSkeleton from '../Icon/Icon.Skeleton';

const icons = {
  'Add (iconAdd from `carbon-icons`)': 'iconAdd',
  'Add with filled circle (iconAddSolid from `carbon-icons`)': 'iconAddSolid',
  'Add with circle (iconAddOutline from `carbon-icons`)': 'iconAddOutline',
};

const iconMap = {
  iconAdd,
  iconAddSolid,
  iconAddOutline,
};

const props = () => {
  const selectedIcon = select(
    'The icon (icon (regular)/name (legacy))',
    icons,
    'iconAdd'
  );
  return {
    style: {
      margin: '50px',
    },
    icon: iconMap[selectedIcon],
    name: iconMap[selectedIcon] ? undefined : selectedIcon,
    role: text('ARIA role (role)', 'img'),
    fill: text('The SVG `fill` attribute (fill)', 'grey'),
    fillRule: text('The SVG `fillRule` attribute (fillRule)', ''),
    width: text('The SVG `width` attribute (width)', ''),
    height: text('The SVG `height` attribute (height)', ''),
    description: text(
      'The a11y text (description)',
      'This is a description of the icon and what it does in context'
    ),
    iconTitle: text('The content in <title> in SVG (iconTitle)', ''),
    className: 'extra-class',
  };
};

const propsSkeleton = {
  style: {
    margin: '50px',
  },
};

const propsSkeleton2 = {
  style: {
    margin: '50px',
    width: '24px',
    height: '24px',
  },
};

export default {
  title: 'Deprecated/Icon',
  decorators: [withKnobs],

  parameters: {
    component: Icon,
  },
};

export const Default = () => (
  <div>
    <Icon {...props()} />
  </div>
);

Default.parameters = {
  info: {
    text: `
        Icons are used in the product to present common actions and commands. Modify the fill property to change the color of the icon. The name property defines which icon to display. For accessibility, provide a context-rich description with the description prop. For a full list of icon names, see https://www.carbondesignsystem.com/guidelines/iconography/library
      `,
  },
};

export const Skeleton = () => (
  <div>
    <IconSkeleton {...propsSkeleton} />
    <IconSkeleton {...propsSkeleton2} />
  </div>
);

Skeleton.parameters = {
  info: {
    text: `
        Icons are used in the product to present common actions and commands. Modify the fill property to change the color of the icon. The name property defines which icon to display. For accessibility, provide a context-rich description with the description prop. For a full list of icon names, see https://www.carbondesignsystem.com/guidelines/iconography/library
      `,
  },
};
