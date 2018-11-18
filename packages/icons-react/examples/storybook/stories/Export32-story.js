import React from 'react';
import { storiesOf } from '@storybook/react';
import Export32 from '../../../es/export/32.js';

storiesOf('Export32', module)
  .add('default', () => <Export32 />)
  .add('with accessibility label', () => (
    <Export32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Export32 aria-label="Icon label">
      <title>Icon title</title>
    </Export32>
  ));
