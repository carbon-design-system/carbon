import React from 'react';
import { storiesOf } from '@storybook/react';
import Forward_532 from '../../../lib/forward--5/32';

storiesOf('Forward_532', module)
  .add('default', () => <Forward_532 />)
  .add('with accessibility label', () => (
    <Forward_532 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Forward_532 focusable>
      <title>Icon title</title>
    </Forward_532>
  ));
