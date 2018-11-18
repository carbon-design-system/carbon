import React from 'react';
import { storiesOf } from '@storybook/react';
import Map24 from '../../../es/map/24.js';

storiesOf('Map24', module)
  .add('default', () => <Map24 />)
  .add('with accessibility label', () => (
    <Map24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Map24 aria-label="Icon label">
      <title>Icon title</title>
    </Map24>
  ));
