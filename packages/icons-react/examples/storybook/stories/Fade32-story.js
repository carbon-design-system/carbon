import React from 'react';
import { storiesOf } from '@storybook/react';
import Fade32 from '../../../es/fade/32.js';

storiesOf('Fade32', module)
  .add('default', () => <Fade32 />)
  .add('with accessibility label', () => (
    <Fade32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Fade32 aria-label="Icon label">
      <title>Icon title</title>
    </Fade32>
  ));
