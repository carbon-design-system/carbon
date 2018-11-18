import React from 'react';
import { storiesOf } from '@storybook/react';
import Compass20 from '../../../es/compass/20.js';

storiesOf('Compass20', module)
  .add('default', () => <Compass20 />)
  .add('with accessibility label', () => (
    <Compass20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Compass20 aria-label="Icon label">
      <title>Icon title</title>
    </Compass20>
  ));
