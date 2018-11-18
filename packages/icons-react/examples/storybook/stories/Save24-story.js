import React from 'react';
import { storiesOf } from '@storybook/react';
import Save24 from '../../../es/save/24.js';

storiesOf('Save24', module)
  .add('default', () => <Save24 />)
  .add('with accessibility label', () => (
    <Save24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Save24 aria-label="Icon label">
      <title>Icon title</title>
    </Save24>
  ));
