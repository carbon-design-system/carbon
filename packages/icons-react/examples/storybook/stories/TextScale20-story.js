import React from 'react';
import { storiesOf } from '@storybook/react';
import TextScale20 from '../../../es/text-scale/20.js';

storiesOf('TextScale20', module)
  .add('default', () => <TextScale20 />)
  .add('with accessibility label', () => (
    <TextScale20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextScale20 aria-label="Icon label">
      <title>Icon title</title>
    </TextScale20>
  ));
