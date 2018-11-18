import React from 'react';
import { storiesOf } from '@storybook/react';
import Export24 from '../../../es/export/24.js';

storiesOf('Export24', module)
  .add('default', () => <Export24 />)
  .add('with accessibility label', () => (
    <Export24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Export24 aria-label="Icon label">
      <title>Icon title</title>
    </Export24>
  ));
