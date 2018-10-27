import React from 'react';
import { storiesOf } from '@storybook/react';
import Map32 from '../../../lib/map/32';

storiesOf('Map32', module)
  .add('default', () => <Map32 />)
  .add('with accessibility label', () => (
    <Map32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Map32 focusable>
      <title>Icon title</title>
    </Map32>
  ));
