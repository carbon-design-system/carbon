import React from 'react';
import { storiesOf } from '@storybook/react';
import Zip32 from '../../../es/ZIP/32.js';

storiesOf('Zip32', module)
  .add('default', () => <Zip32 />)
  .add('with accessibility label', () => (
    <Zip32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Zip32 aria-label="Icon label">
      <title>Icon title</title>
    </Zip32>
  ));
