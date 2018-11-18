import React from 'react';
import { storiesOf } from '@storybook/react';
import Compass32 from '../../../es/compass/32.js';

storiesOf('Compass32', module)
  .add('default', () => <Compass32 />)
  .add('with accessibility label', () => (
    <Compass32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Compass32 aria-label="Icon label">
      <title>Icon title</title>
    </Compass32>
  ));
