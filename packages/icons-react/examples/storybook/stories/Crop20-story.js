import React from 'react';
import { storiesOf } from '@storybook/react';
import Crop20 from '../../../es/crop/20.js';

storiesOf('Crop20', module)
  .add('default', () => <Crop20 />)
  .add('with accessibility label', () => (
    <Crop20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Crop20 aria-label="Icon label">
      <title>Icon title</title>
    </Crop20>
  ));
