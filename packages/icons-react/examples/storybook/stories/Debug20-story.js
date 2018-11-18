import React from 'react';
import { storiesOf } from '@storybook/react';
import Debug20 from '../../../es/debug/20.js';

storiesOf('Debug20', module)
  .add('default', () => <Debug20 />)
  .add('with accessibility label', () => (
    <Debug20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Debug20 aria-label="Icon label">
      <title>Icon title</title>
    </Debug20>
  ));
