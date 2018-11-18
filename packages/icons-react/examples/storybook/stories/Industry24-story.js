import React from 'react';
import { storiesOf } from '@storybook/react';
import Industry24 from '../../../es/industry/24.js';

storiesOf('Industry24', module)
  .add('default', () => <Industry24 />)
  .add('with accessibility label', () => (
    <Industry24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Industry24 aria-label="Icon label">
      <title>Icon title</title>
    </Industry24>
  ));
