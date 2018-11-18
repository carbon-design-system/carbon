import React from 'react';
import { storiesOf } from '@storybook/react';
import Accessibility20 from '../../../es/accessibility/20.js';

storiesOf('Accessibility20', module)
  .add('default', () => <Accessibility20 />)
  .add('with accessibility label', () => (
    <Accessibility20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Accessibility20 aria-label="Icon label">
      <title>Icon title</title>
    </Accessibility20>
  ));
