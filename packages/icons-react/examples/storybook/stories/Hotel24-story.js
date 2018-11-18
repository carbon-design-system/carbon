import React from 'react';
import { storiesOf } from '@storybook/react';
import Hotel24 from '../../../es/hotel/24.js';

storiesOf('Hotel24', module)
  .add('default', () => <Hotel24 />)
  .add('with accessibility label', () => (
    <Hotel24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Hotel24 aria-label="Icon label">
      <title>Icon title</title>
    </Hotel24>
  ));
