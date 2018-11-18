import React from 'react';
import { storiesOf } from '@storybook/react';
import Close24 from '../../../es/close/24.js';

storiesOf('Close24', module)
  .add('default', () => <Close24 />)
  .add('with accessibility label', () => (
    <Close24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Close24 aria-label="Icon label">
      <title>Icon title</title>
    </Close24>
  ));
