import React from 'react';
import { storiesOf } from '@storybook/react';
import Light20 from '../../../es/light/20.js';

storiesOf('Light20', module)
  .add('default', () => <Light20 />)
  .add('with accessibility label', () => (
    <Light20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Light20 aria-label="Icon label">
      <title>Icon title</title>
    </Light20>
  ));
