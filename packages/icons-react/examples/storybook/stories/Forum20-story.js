import React from 'react';
import { storiesOf } from '@storybook/react';
import Forum20 from '../../../es/forum/20.js';

storiesOf('Forum20', module)
  .add('default', () => <Forum20 />)
  .add('with accessibility label', () => (
    <Forum20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Forum20 aria-label="Icon label">
      <title>Icon title</title>
    </Forum20>
  ));
