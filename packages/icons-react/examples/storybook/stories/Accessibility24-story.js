import React from 'react';
import { storiesOf } from '@storybook/react';
import Accessibility24 from '../../../es/accessibility/24.js';

storiesOf('Accessibility24', module)
  .add('default', () => <Accessibility24 />)
  .add('with accessibility label', () => (
    <Accessibility24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Accessibility24 aria-label="Icon label">
      <title>Icon title</title>
    </Accessibility24>
  ));
