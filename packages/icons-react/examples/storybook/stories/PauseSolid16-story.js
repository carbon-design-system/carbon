import React from 'react';
import { storiesOf } from '@storybook/react';
import PauseSolid16 from '../../../lib/pause--solid/16';

storiesOf('PauseSolid16', module)
  .add('default', () => <PauseSolid16 />)
  .add('with accessibility label', () => (
    <PauseSolid16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <PauseSolid16 focusable>
      <title>Icon title</title>
    </PauseSolid16>
  ));
