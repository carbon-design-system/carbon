import React from 'react';
import { storiesOf } from '@storybook/react';
import Crop32 from '../../../es/crop/32.js';

storiesOf('Crop32', module)
  .add('default', () => <Crop32 />)
  .add('with accessibility label', () => (
    <Crop32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Crop32 aria-label="Icon label">
      <title>Icon title</title>
    </Crop32>
  ));
