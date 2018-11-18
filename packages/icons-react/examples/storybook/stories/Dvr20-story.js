import React from 'react';
import { storiesOf } from '@storybook/react';
import Dvr20 from '../../../es/DVR/20.js';

storiesOf('Dvr20', module)
  .add('default', () => <Dvr20 />)
  .add('with accessibility label', () => (
    <Dvr20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Dvr20 aria-label="Icon label">
      <title>Icon title</title>
    </Dvr20>
  ));
