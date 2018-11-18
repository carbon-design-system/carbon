import React from 'react';
import { storiesOf } from '@storybook/react';
import Map20 from '../../../es/map/20.js';

storiesOf('Map20', module)
  .add('default', () => <Map20 />)
  .add('with accessibility label', () => (
    <Map20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Map20 aria-label="Icon label">
      <title>Icon title</title>
    </Map20>
  ));
