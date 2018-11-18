import React from 'react';
import { storiesOf } from '@storybook/react';
import TextScale24 from '../../../es/text-scale/24.js';

storiesOf('TextScale24', module)
  .add('default', () => <TextScale24 />)
  .add('with accessibility label', () => (
    <TextScale24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextScale24 aria-label="Icon label">
      <title>Icon title</title>
    </TextScale24>
  ));
