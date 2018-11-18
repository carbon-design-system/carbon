import React from 'react';
import { storiesOf } from '@storybook/react';
import Add24 from '../../../es/add/24.js';

storiesOf('Add24', module)
  .add('default', () => <Add24 />)
  .add('with accessibility label', () => (
    <Add24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Add24 aria-label="Icon label">
      <title>Icon title</title>
    </Add24>
  ));
