import React from 'react';
import { storiesOf } from '@storybook/react';
import Purchase24 from '../../../es/purchase/24.js';

storiesOf('Purchase24', module)
  .add('default', () => <Purchase24 />)
  .add('with accessibility label', () => (
    <Purchase24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Purchase24 aria-label="Icon label">
      <title>Icon title</title>
    </Purchase24>
  ));
