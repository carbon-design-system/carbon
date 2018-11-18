import React from 'react';
import { storiesOf } from '@storybook/react';
import Menu20 from '../../../es/menu/20.js';

storiesOf('Menu20', module)
  .add('default', () => <Menu20 />)
  .add('with accessibility label', () => (
    <Menu20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Menu20 aria-label="Icon label">
      <title>Icon title</title>
    </Menu20>
  ));
