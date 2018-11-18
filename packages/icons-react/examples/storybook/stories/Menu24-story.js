import React from 'react';
import { storiesOf } from '@storybook/react';
import Menu24 from '../../../es/menu/24.js';

storiesOf('Menu24', module)
  .add('default', () => <Menu24 />)
  .add('with accessibility label', () => (
    <Menu24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Menu24 aria-label="Icon label">
      <title>Icon title</title>
    </Menu24>
  ));
