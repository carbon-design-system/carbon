import React from 'react';
import { storiesOf } from '@storybook/react';
import TextFill20 from '../../../es/text-fill/20.js';

storiesOf('TextFill20', module)
  .add('default', () => <TextFill20 />)
  .add('with accessibility label', () => (
    <TextFill20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextFill20 aria-label="Icon label">
      <title>Icon title</title>
    </TextFill20>
  ));
