import React from 'react';
import { storiesOf } from '@storybook/react';
import View32 from '../../../lib/view/32';

storiesOf('View32', module)
  .add('default', () => <View32 />)
  .add('with accessibility label', () => (
    <View32 aria-label="Accessibility label" />
  ))
  .add('with title', () => (
    <View32 focusable>
      <title>Icon title</title>
    </View32>
  ));
