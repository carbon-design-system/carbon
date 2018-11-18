import React from 'react';
import { storiesOf } from '@storybook/react';
import Tif32 from '../../../es/TIF/32.js';

storiesOf('Tif32', module)
  .add('default', () => <Tif32 />)
  .add('with accessibility label', () => (
    <Tif32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Tif32 aria-label="Icon label">
      <title>Icon title</title>
    </Tif32>
  ));
