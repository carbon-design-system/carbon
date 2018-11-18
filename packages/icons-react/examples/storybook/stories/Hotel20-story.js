import React from 'react';
import { storiesOf } from '@storybook/react';
import Hotel20 from '../../../es/hotel/20.js';

storiesOf('Hotel20', module)
  .add('default', () => <Hotel20 />)
  .add('with accessibility label', () => (
    <Hotel20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Hotel20 aria-label="Icon label">
      <title>Icon title</title>
    </Hotel20>
  ));
