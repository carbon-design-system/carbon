import React from 'react';
import { storiesOf } from '@storybook/react';
import Tag20 from '../../../es/tag/20.js';

storiesOf('Tag20', module)
  .add('default', () => <Tag20 />)
  .add('with accessibility label', () => (
    <Tag20 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Tag20 aria-label="Icon label">
      <title>Icon title</title>
    </Tag20>
  ));
