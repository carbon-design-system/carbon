import React from 'react';
import { storiesOf } from '@storybook/react';
import Export16 from '../../../lib/Export/16';

storiesOf('Export16', module)
  .add('default', () => <Export16 />)
  .add('with accessibility label', () => (
    <Export16 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Export16 focusable>
      <title>Icon title</title>
    </Export16>
  ));
