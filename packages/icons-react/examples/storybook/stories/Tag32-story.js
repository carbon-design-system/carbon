import React from 'react';
import { storiesOf } from '@storybook/react';
import Tag32 from '../../../lib/tag/32';

storiesOf('Tag32', module)
  .add('default', () => <Tag32 />)
  .add('with accessibility label', () => (
    <Tag32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Tag32 focusable>
      <title>Icon title</title>
    </Tag32>
  ));
