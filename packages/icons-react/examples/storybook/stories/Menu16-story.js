import React from 'react';
import { storiesOf } from '@storybook/react';
import Menu16 from '../../../es/menu/16.js';

storiesOf('Menu16', module)
  .add('default', () => <Menu16 />)
  .add('with accessibility label', () => (
    <Menu16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Menu16 aria-label="Icon label">
      <title>Icon title</title>
    </Menu16>
  ));
