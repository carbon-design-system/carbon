import React from 'react';
import { storiesOf } from '@storybook/react';
import Icon from '../Icon';

const props = {
  style: {
    margin: '50px',
  },
  fill: 'grey',
  description: 'This is a description of the icon and what it does in context',
  className: 'extra-class',
};

storiesOf('Icon', module).addWithInfo(
  'Default',
  `
    Icons are used in the product to present common actions and commands. Modify the fill property to change the color of the icon. The name property defines which icon to display. For accessibility, provide a context-rich description with the description prop. For a full list of icon names, see carbondesignsystem.com/style/iconography/library
  `,
  () => (
    <div>
      <Icon name="icon--add" {...props} />
      <Icon name="add--glyph" {...props} />
      <Icon name="add--outline" {...props} />
    </div>
  )
);
