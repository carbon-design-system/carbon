import React from 'react';
import { storiesOf } from '@storybook/react';
import Export20 from '../../../es/export/20.js';

storiesOf('Export20', module)
  .add('default', () => <Export20 />)
  .add('with accessibility label', () => (
    <Export20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Export20 aria-label="Icon label">
      <title>Icon title</title>
    </Export20>
  ));
