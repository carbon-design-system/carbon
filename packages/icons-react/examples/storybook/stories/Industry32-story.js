import React from 'react';
import { storiesOf } from '@storybook/react';
import Industry32 from '../../../es/industry/32.js';

storiesOf('Industry32', module)
  .add('default', () => <Industry32 />)
  .add('with accessibility label', () => (
    <Industry32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Industry32 aria-label="Icon label">
      <title>Icon title</title>
    </Industry32>
  ));
