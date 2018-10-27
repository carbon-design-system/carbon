import React from 'react';
import { storiesOf } from '@storybook/react';
import CloudSnow32 from '../../../lib/cloud--snow/32';

storiesOf('CloudSnow32', module)
  .add('default', () => <CloudSnow32 />)
  .add('with accessibility label', () => (
    <CloudSnow32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <CloudSnow32 focusable>
      <title>Icon title</title>
    </CloudSnow32>
  ));
