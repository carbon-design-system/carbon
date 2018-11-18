import React from 'react';
import { storiesOf } from '@storybook/react';
import Tif20 from '../../../es/TIF/20.js';

storiesOf('Tif20', module)
  .add('default', () => <Tif20 />)
  .add('with accessibility label', () => (
    <Tif20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Tif20 aria-label="Icon label">
      <title>Icon title</title>
    </Tif20>
  ));
