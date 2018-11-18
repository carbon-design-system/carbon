import React from 'react';
import { storiesOf } from '@storybook/react';
import Add32 from '../../../es/add/32.js';

storiesOf('Add32', module)
  .add('default', () => <Add32 />)
  .add('with accessibility label', () => (
    <Add32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Add32 aria-label="Icon label">
      <title>Icon title</title>
    </Add32>
  ));
