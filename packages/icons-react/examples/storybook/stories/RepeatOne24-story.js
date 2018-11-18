import React from 'react';
import { storiesOf } from '@storybook/react';
import RepeatOne24 from '../../../es/repeat--one/24.js';

storiesOf('RepeatOne24', module)
  .add('default', () => <RepeatOne24 />)
  .add('with accessibility label', () => (
    <RepeatOne24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <RepeatOne24 aria-label="Icon label">
      <title>Icon title</title>
    </RepeatOne24>
  ));
