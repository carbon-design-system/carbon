import React from 'react';
import { storiesOf } from '@storybook/react';
import TextColor24 from '../../../es/text-color/24.js';

storiesOf('TextColor24', module)
  .add('default', () => <TextColor24 />)
  .add('with accessibility label', () => (
    <TextColor24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextColor24 aria-label="Icon label">
      <title>Icon title</title>
    </TextColor24>
  ));
