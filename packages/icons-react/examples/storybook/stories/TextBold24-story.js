import React from 'react';
import { storiesOf } from '@storybook/react';
import TextBold24 from '../../../es/text-bold/24.js';

storiesOf('TextBold24', module)
  .add('default', () => <TextBold24 />)
  .add('with accessibility label', () => (
    <TextBold24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextBold24 aria-label="Icon label">
      <title>Icon title</title>
    </TextBold24>
  ));
