import React from 'react';
import { storiesOf } from '@storybook/react';
import Idea32 from '../../../lib/idea/32';

storiesOf('Idea32', module)
  .add('default', () => <Idea32 />)
  .add('with accessibility label', () => (
    <Idea32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Idea32 focusable>
      <title>Icon title</title>
    </Idea32>
  ));
