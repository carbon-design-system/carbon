import React from 'react';
import { storiesOf } from '@storybook/react';
import Fade24 from '../../../es/fade/24.js';

storiesOf('Fade24', module)
  .add('default', () => <Fade24 />)
  .add('with accessibility label', () => (
    <Fade24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Fade24 aria-label="Icon label">
      <title>Icon title</title>
    </Fade24>
  ));
