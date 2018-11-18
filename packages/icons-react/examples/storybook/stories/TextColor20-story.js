import React from 'react';
import { storiesOf } from '@storybook/react';
import TextColor20 from '../../../es/text-color/20.js';

storiesOf('TextColor20', module)
  .add('default', () => <TextColor20 />)
  .add('with accessibility label', () => (
    <TextColor20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextColor20 aria-label="Icon label">
      <title>Icon title</title>
    </TextColor20>
  ));
