import React from 'react';
import { storiesOf } from '@storybook/react';
import Dvr24 from '../../../es/DVR/24.js';

storiesOf('Dvr24', module)
  .add('default', () => <Dvr24 />)
  .add('with accessibility label', () => (
    <Dvr24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Dvr24 aria-label="Icon label">
      <title>Icon title</title>
    </Dvr24>
  ));
