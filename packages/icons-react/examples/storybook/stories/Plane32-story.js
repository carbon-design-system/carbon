import React from 'react';
import { storiesOf } from '@storybook/react';
import Plane32 from '../../../lib/plane/32';

storiesOf('Plane32', module)
  .add('default', () => <Plane32 />)
  .add('with accessibility label', () => (
    <Plane32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Plane32 focusable>
      <title>Icon title</title>
    </Plane32>
  ));
