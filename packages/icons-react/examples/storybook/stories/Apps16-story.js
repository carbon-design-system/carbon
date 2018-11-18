import React from 'react';
import { storiesOf } from '@storybook/react';
import Apps16 from '../../../es/apps/16.js';

storiesOf('Apps16', module)
  .add('default', () => <Apps16 />)
  .add('with accessibility label', () => (
    <Apps16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Apps16 aria-label="Icon label">
      <title>Icon title</title>
    </Apps16>
  ));
