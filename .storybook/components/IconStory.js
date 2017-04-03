import React from 'react';
import { storiesOf } from '@kadira/storybook';
import Icon from '../../components/Icon';

const props = {
  style: {
    margin: '50px',
    outline: '1px solid red',
  },
  fill: 'yellow',
  description: 'description',
  className: 'extra-class',
};

storiesOf('Icon', module)
  .addWithInfo(
    '',
    `
      Icons are used in the product to present common actions and commands. Modify the fill
      property to change the color of the icon. The name property specifies which the icon to be displayed.
      For a full list of icon names, see: http://carbondesignsystem.com/style/iconography/library.

      Also note that the name prop can accept icon names with or without the icon-- prefix.
    `,
    () => (
      <div>
        <Icon name="icon--add" {...props} />
        <Icon name="add--glyph" {...props} />
        <Icon name="add--outline" {...props} />
      </div>
    ),
  );
