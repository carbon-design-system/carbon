import React from 'react';
import { storiesOf } from '@storybook/react';
import Run20 from '../../../es/run/20.js';

storiesOf('Run20', module)
  .add('default', () => <Run20 />)
  .add('with accessibility label', () => (
    <Run20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Run20 aria-label="Icon label">
      <title>Icon title</title>
    </Run20>
  ));
