import React from 'react';
import { storiesOf } from '@storybook/react';
import Icon from '../Icon';
import IconSkeleton from '../Icon/Icon.Skeleton';

const props = {
  style: {
    margin: '50px',
  },
  fill: 'grey',
  description: 'This is a description of the icon and what it does in context',
  className: 'extra-class',
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

storiesOf('Icon', module)
  .addWithInfo(
    'Default',
    `
    Icons are used in the product to present common actions and commands. Modify the fill property to change the color of the icon. The name property defines which icon to display. For accessibility, provide a context-rich description with the description prop. For a full list of icon names, see carbondesignsystem.com/style/iconography/library
  `,
    () => (
      <div>
        <Icon name="icon--add" {...props} />
        <Icon name="add--solid" {...props} />
        <Icon name="add--outline" {...props} />
      </div>
    )
  )
  .addWithInfo(
    'Skeleton',
    `
    Icons are used in the product to present common actions and commands. Modify the fill property to change the color of the icon. The name property defines which icon to display. For accessibility, provide a context-rich description with the description prop. For a full list of icon names, see carbondesignsystem.com/style/iconography/library
  `,
    () => (
      <div>
        <IconSkeleton {...propsSkeleton} />
        <IconSkeleton {...propsSkeleton2} />
      </div>
    )
  );
