import React from 'react';
import { storiesOf } from '@storybook/react';
import Help24 from '../../../es/help/24.js';

storiesOf('Help24', module)
  .add('default', () => <Help24 />)
  .add('with accessibility label', () => (
    <Help24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Help24 aria-label="Icon label">
      <title>Icon title</title>
    </Help24>
  ));
