import React from 'react';
import { storiesOf } from '@storybook/react';
import Crop24 from '../../../es/crop/24.js';

storiesOf('Crop24', module)
  .add('default', () => <Crop24 />)
  .add('with accessibility label', () => (
    <Crop24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Crop24 aria-label="Icon label">
      <title>Icon title</title>
    </Crop24>
  ));
