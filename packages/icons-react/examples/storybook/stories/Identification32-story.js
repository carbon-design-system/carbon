import React from 'react';
import { storiesOf } from '@storybook/react';
import Identification32 from '../../../es/identification/32.js';

storiesOf('Identification32', module)
  .add('default', () => <Identification32 />)
  .add('with accessibility label', () => (
    <Identification32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Identification32 aria-label="Icon label">
      <title>Icon title</title>
    </Identification32>
  ));
