import React from 'react';
import { storiesOf } from '@storybook/react';
import Tag24 from '../../../es/tag/24.js';

storiesOf('Tag24', module)
  .add('default', () => <Tag24 />)
  .add('with accessibility label', () => (
    <Tag24 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Tag24 aria-label="Icon label">
      <title>Icon title</title>
    </Tag24>
  ));
