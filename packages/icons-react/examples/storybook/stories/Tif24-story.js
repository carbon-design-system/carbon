import React from 'react';
import { storiesOf } from '@storybook/react';
import Tif24 from '../../../es/TIF/24.js';

storiesOf('Tif24', module)
  .add('default', () => <Tif24 />)
  .add('with accessibility label', () => (
    <Tif24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Tif24 aria-label="Icon label">
      <title>Icon title</title>
    </Tif24>
  ));
