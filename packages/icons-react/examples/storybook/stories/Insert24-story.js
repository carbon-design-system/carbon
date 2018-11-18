import React from 'react';
import { storiesOf } from '@storybook/react';
import Insert24 from '../../../es/insert/24.js';

storiesOf('Insert24', module)
  .add('default', () => <Insert24 />)
  .add('with accessibility label', () => (
    <Insert24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Insert24 aria-label="Icon label">
      <title>Icon title</title>
    </Insert24>
  ));
