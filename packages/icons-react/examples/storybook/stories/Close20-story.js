import React from 'react';
import { storiesOf } from '@storybook/react';
import Close20 from '../../../es/close/20.js';

storiesOf('Close20', module)
  .add('default', () => <Close20 />)
  .add('with accessibility label', () => (
    <Close20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Close20 aria-label="Icon label">
      <title>Icon title</title>
    </Close20>
  ));
