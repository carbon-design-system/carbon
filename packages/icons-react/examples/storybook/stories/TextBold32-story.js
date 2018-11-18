import React from 'react';
import { storiesOf } from '@storybook/react';
import TextBold32 from '../../../es/text-bold/32.js';

storiesOf('TextBold32', module)
  .add('default', () => <TextBold32 />)
  .add('with accessibility label', () => (
    <TextBold32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextBold32 aria-label="Icon label">
      <title>Icon title</title>
    </TextBold32>
  ));
