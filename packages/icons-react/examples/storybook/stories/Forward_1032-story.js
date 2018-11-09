import React from 'react';
import { storiesOf } from '@storybook/react';
import Forward_1032 from '../../../lib/Forward_10/32';

storiesOf('Forward_1032', module)
  .add('default', () => <Forward_1032 />)
  .add('with accessibility label', () => (
    <Forward_1032 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <Forward_1032 focusable>
      <title>Icon title</title>
    </Forward_1032>
  ));
