import React from 'react';
import { storiesOf } from '@storybook/react';
import Export32 from '../../../lib/Export/32';

storiesOf('Export32', module)
  .add('default', () => <Export32 />)
  .add('with accessibility label', () => (
    <Export32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Export32 focusable>
      <title>Icon title</title>
    </Export32>
  ));
