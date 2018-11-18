import React from 'react';
import { storiesOf } from '@storybook/react';
import Map32 from '../../../es/map/32.js';

storiesOf('Map32', module)
  .add('default', () => <Map32 />)
  .add('with accessibility label', () => (
    <Map32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Map32 aria-label="Icon label">
      <title>Icon title</title>
    </Map32>
  ));
