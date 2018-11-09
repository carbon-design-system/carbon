import React from 'react';
import { storiesOf } from '@storybook/react';
import Industry32 from '../../../lib/Industry/32';

storiesOf('Industry32', module)
  .add('default', () => <Industry32 />)
  .add('with accessibility label', () => (
    <Industry32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Industry32 focusable>
      <title>Icon title</title>
    </Industry32>
  ));
