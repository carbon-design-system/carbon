import React from 'react';
import { storiesOf } from '@storybook/react';
import Dvr32 from '../../../es/DVR/32.js';

storiesOf('Dvr32', module)
  .add('default', () => <Dvr32 />)
  .add('with accessibility label', () => (
    <Dvr32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Dvr32 aria-label="Icon label">
      <title>Icon title</title>
    </Dvr32>
  ));
