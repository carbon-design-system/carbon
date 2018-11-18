import React from 'react';
import { storiesOf } from '@storybook/react';
import RepeatOne20 from '../../../es/repeat--one/20.js';

storiesOf('RepeatOne20', module)
  .add('default', () => <RepeatOne20 />)
  .add('with accessibility label', () => (
    <RepeatOne20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RepeatOne20 aria-label="Icon label">
      <title>Icon title</title>
    </RepeatOne20>
  ));
