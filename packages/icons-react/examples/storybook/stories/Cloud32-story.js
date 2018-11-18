import React from 'react';
import { storiesOf } from '@storybook/react';
import Cloud32 from '../../../es/cloud/32.js';

storiesOf('Cloud32', module)
  .add('default', () => <Cloud32 />)
  .add('with accessibility label', () => (
    <Cloud32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Cloud32 aria-label="Icon label">
      <title>Icon title</title>
    </Cloud32>
  ));
