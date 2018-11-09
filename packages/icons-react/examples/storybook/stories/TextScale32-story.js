import React from 'react';
import { storiesOf } from '@storybook/react';
import TextScale32 from '../../../lib/TextScale/32';

storiesOf('TextScale32', module)
  .add('default', () => <TextScale32 />)
  .add('with accessibility label', () => (
    <TextScale32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <TextScale32 focusable>
      <title>Icon title</title>
    </TextScale32>
  ));
