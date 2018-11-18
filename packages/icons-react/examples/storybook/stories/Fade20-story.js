import React from 'react';
import { storiesOf } from '@storybook/react';
import Fade20 from '../../../es/fade/20.js';

storiesOf('Fade20', module)
  .add('default', () => <Fade20 />)
  .add('with accessibility label', () => (
    <Fade20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Fade20 aria-label="Icon label">
      <title>Icon title</title>
    </Fade20>
  ));
