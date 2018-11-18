import React from 'react';
import { storiesOf } from '@storybook/react';
import Fade16 from '../../../es/fade/16.js';

storiesOf('Fade16', module)
  .add('default', () => <Fade16 />)
  .add('with accessibility label', () => (
    <Fade16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Fade16 aria-label="Icon label">
      <title>Icon title</title>
    </Fade16>
  ));
