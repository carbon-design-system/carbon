import React from 'react';
import { storiesOf } from '@storybook/react';
import TextBold20 from '../../../es/text-bold/20.js';

storiesOf('TextBold20', module)
  .add('default', () => <TextBold20 />)
  .add('with accessibility label', () => (
    <TextBold20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextBold20 aria-label="Icon label">
      <title>Icon title</title>
    </TextBold20>
  ));
