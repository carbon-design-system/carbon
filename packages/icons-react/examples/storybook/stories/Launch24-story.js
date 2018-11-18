import React from 'react';
import { storiesOf } from '@storybook/react';
import Launch24 from '../../../es/launch/24.js';

storiesOf('Launch24', module)
  .add('default', () => <Launch24 />)
  .add('with accessibility label', () => (
    <Launch24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Launch24 aria-label="Icon label">
      <title>Icon title</title>
    </Launch24>
  ));
